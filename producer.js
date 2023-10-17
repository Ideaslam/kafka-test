const kafka = require('kafka-node');

// Kafka server configuration
const kafkaHost = '172.28.32.226:9092'; // Replace with your Kafka server host and port 
const client = new kafka.KafkaClient({ kafkaHost }); 
const producer = new kafka.Producer(client);

// Handle producer ready event
producer.on('ready', function () {
  console.log('Producer is ready');
  

 

  // Send the message to Kafka
  setInterval(() => {
    var payloads = [
      { topic: 'ISLAM_JS_TEST', messages: new Date().toString() , partition: 0 }, 
    ];
    producer.send(payloads, function (err, data) { 
      
      console.error(err);
    });
  }, 1000); 
});

// Handle producer error event
producer.on('error', function (error) {
  console.error('Error:', error);
});

// Close the producer when you're done
process.on('SIGINT', function () {
  producer.close(function () {
    process.exit();
  });
});
