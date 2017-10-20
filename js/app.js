// replace these values with those generated in your TokBox Account
var apiKey = "45985082";
var sessionId = "1_MX40NTk4NTA4Mn5-MTUwODQ3MjEwNDEyMH5ScmFvaHdsV3puNWxNNTlGMDE0M1R5Y0t-fg";
var token = "T1==cGFydG5lcl9pZD00NTk4NTA4MiZzaWc9MzJiM2FjN2I4NDUwMjAyMDk2ZGJlMjBkODBkYTI0Y2E1MmVlZmM0NzpzZXNzaW9uX2lkPTFfTVg0ME5UazROVEE0TW41LU1UVXdPRFEzTWpFd05ERXlNSDVTY21GdmFIZHNWM3B1Tld4Tk5UbEdNREUwTTFSNVkwdC1mZyZjcmVhdGVfdGltZT0xNTA4NDcyMTI1Jm5vbmNlPTAuODUxMTE0MDM1MTIzOCZyb2xlPXN1YnNjcmliZXImZXhwaXJlX3RpbWU9MTUxMTA2NDEyNCZpbml0aWFsX2xheW91dF9jbGFzc19saXN0PQ==";

// (optional) add server code here
initializeSession();

//Handling all of our errors here by alerting them
function handleError(error) {
  if (error) {
    alert(error.message);
  }
}

function initializeSession() {
  var session = OT.initSession(apiKey, sessionId);

  // Subscribe to a newly created stream

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