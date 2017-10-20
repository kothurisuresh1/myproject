// replace these values with those generated in your TokBox Account
var apiKey = "45985082";
var sessionId = "2_MX40NTk4NTA4Mn5-MTUwODUwMjAzNjcwNn5BaTlRaWtaMDVhT0N3VDdwUGJYMExQR25-UH4";
var token= "T1==cGFydG5lcl9pZD00NTk4NTA4MiZzaWc9ZTIwYWY3ZTE0YzI5ZGY3OWVlZjJlZTNlODk4MWQwNWE5ZWUzZDA3NTpzZXNzaW9uX2lkPTJfTVg0ME5UazROVEE0TW41LU1UVXdPRFV3TWpBek5qY3dObjVCYVRsUmFXdGFNRFZoVDBOM1ZEZHdVR0pZTUV4UVIyNS1VSDQmY3JlYXRlX3RpbWU9MTUwODUwMjEzMCZub25jZT0wLjYwMjMzMTk5NDg1NjIzODUmcm9sZT1wdWJsaXNoZXImZXhwaXJlX3RpbWU9MTUxMTA5NDEyOSZpbml0aWFsX2xheW91dF9jbGFzc19saXN0PQ==";

initializeSession();

// Handling all of our errors here by alerting them
function handleError(error) {
  if (error) {
    alert(error.message);
  }
}

function initializeSession() {
  var session = OT.initSession(apiKey, sessionId);

  // Subscribe to a newly created stream
    
  session.on('streamCreated', function(event) {
  session.subscribe(event.stream, 'subscriber', {
    insertMode: 'append',
    width: '100%',
    height: '100%'
  }, handleError);
  });
	

  // Create a publisher
  var publisher = OT.initPublisher('publisher', {
    insertMode: 'append',
    width: '100%',
    height: '100%'
  }, handleError);

  // Connect to the session
  session.connect(token, function(error) {
    // If the connection is successful, publish to the session
    if (error) {
      handleError(error);
    } else {
      session.publish(publisher, handleError);
    }
  });
}