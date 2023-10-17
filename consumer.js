const kafka = require('kafka-node');

// Kafka server configuration
const kafkaHost = '8.213.27.163:9092'; // Replace with your Kafka server host and port

// Create a Kafka client
const client = new kafka.KafkaClient({ kafkaHost });

// Create a consumer
const consumer = new kafka.Consumer(
  client,
  [
    {
      topic: 'ISLAM_JS_TEST', // Replace with the name of the Kafka topic you want to consume from
      partition: 0, // Partition number, 0 by default
      offset: 0 // Offset to start consuming from, 0 by default
    } 
  ],
  {
    autoCommit: false // Set to true to enable auto commit, false by default
  }
);

// Handle incoming messages
consumer.on('message', function (message) { 
  console.log('Received message:', message );
});

// Handle errors
consumer.on('error', function (error) {
  console.error('Error:', error);
});

// Close the consumer when you're done
process.on('SIGINT', function () {
  consumer.close(true, function () {
    process.exit();
  });
});
