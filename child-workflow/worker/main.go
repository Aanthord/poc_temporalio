package main

import (
	"log"

	"go.temporal.io/sdk/client"
	"go.temporal.io/sdk/worker"

	child_workflow "github.com/aanthord/poc_temporalio/child-workflow"
)
//get a list of all the topics
func getKafkaTopics(kafkaURL) {
	conn, err := kafka.Dial("tcp", kafkaURL)
	if err != nil {
    panic(err.Error())
}
	defer conn.Close()

	partitions, err := conn.ReadPartitions()
	if err != nil {
    		panic(err.Error())
}

	m := map[string]struct{}{}

	for _, p := range partitions {
    	m[p.Topic] = struct{}{}
}
	for k := range m {
    	fmt.Println(k)
}
}

func getKafkaReader(kafkaURL, topic, groupID string) *kafka.Reader {
	brokers := strings.Split(kafkaURL, ",")
	return kafka.NewReader(kafka.ReaderConfig{
		Brokers:  brokers,
		GroupID:  groupID,
		Topic:    topic,
		MinBytes: 10e3, // 10KB
		MaxBytes: 10e6, // 10MB
	})
}
//Brain hurt need to iterate over topics in the list and call main for each topic creating a distinct
// count of messages in each topic. 

func main() {
	// The client is a heavyweight object that should be created only once per process.
	c, err := client.Dial(client.Options{
		HostPort: client.DefaultHostPort,
	})
	if err != nil {
		log.Fatalln("Unable to create client", err)
	}
	defer c.Close()

	w := worker.New(c, "child-workflow", worker.Options{})

	w.RegisterWorkflow(child_workflow.ParentWorkflow)
	w.RegisterWorkflow(child_workflow.ChildWorkflow)

	err = w.Run(worker.InterruptCh())
	if err != nil {
		log.Fatalln("Unable to start worker", err)

	// get kafka reader using environment variables.
	kafkaURL := os.Getenv("kafkaURL")
	topic := os.Getenv("topic")
	groupID := os.Getenv("groupID")

	reader := getKafkaReader(kafkaURL, topic, groupID)

	defer reader.Close()

	fmt.Println("start consuming ... !!")
	for {
		m, err := reader.ReadMessage(context.Background())
		if err != nil {
			log.Fatalln(err)
		}
		fmt.Printf("message at topic:%v partition:%v offset:%v	%s = %s\n", m.Topic, m.Partition, m.Offset, string(m.Key), string(m.Value))
	}
}
}
