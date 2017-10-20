// replace these values with those generated in your TokBox Account
var API_KEY = "45985082";
var SESSION_ID = "1_MX40NTk4NTA4Mn5-MTUwODQ3MjEwNDEyMH5ScmFvaHdsV3puNWxNNTlGMDE0M1R5Y0t-fg";
var TOKEN = "T1==cGFydG5lcl9pZD00NTk4NTA4MiZzaWc9MzJiM2FjN2I4NDUwMjAyMDk2ZGJlMjBkODBkYTI0Y2E1MmVlZmM0NzpzZXNzaW9uX2lkPTFfTVg0ME5UazROVEE0TW41LU1UVXdPRFEzTWpFd05ERXlNSDVTY21GdmFIZHNWM3B1Tld4Tk5UbEdNREUwTTFSNVkwdC1mZyZjcmVhdGVfdGltZT0xNTA4NDcyMTI1Jm5vbmNlPTAuODUxMTE0MDM1MTIzOCZyb2xlPXN1YnNjcmliZXImZXhwaXJlX3RpbWU9MTUxMTA2NDEyNCZpbml0aWFsX2xheW91dF9jbGFzc19saXN0PQ==";

$(document).ready(function() {
  // See the confing.js file.
  if (API_KEY && TOKEN && SESSION_ID) {
    apiKey = API_KEY;
    sessionId = SESSION_ID;
    token = TOKEN;
    initializeSession();
  } else if (SAMPLE_SERVER_BASE_URL) {
    // Make an Ajax request to get the OpenTok API key, session ID, and token from the server
    $.get('http://139.59.70.55/myproject/index.html', function(res) {
      apiKey = res.apiKey;
      sessionId = res.sessionId;
      token = res.token;

      initializeSession();
    });
  }
});

function initializeSession() {
  var session = OT.initSession(apiKey, sessionId);

  // Subscribe to a newly created stream
  session.on('streamCreated', function(event) {
    var subscriberOptions = {
      insertMode: 'append',
      width: '100%',
      height: '100%'
    };
    session.subscribe(event.stream, 'subscriber', subscriberOptions, function(error) {
      if (error) {
        console.log('There was an error publishing: ', error.name, error.message);
      }
    });
  });

  session.on('sessionDisconnected', function(event) {
    console.log('You were disconnected from the session.', event.reason);
  });

  // Connect to the session
  session.connect(token, function(error) {
    // If the connection is successful, initialize a publisher and publish to the session
    if (!error) {
      var publisherOptions = {
        insertMode: 'append',
        width: '100%',
        height: '100%'
      };
      var publisher = OT.initPublisher('publisher', publisherOptions, function(error) {
        if (error) {
          console.log('There was an error initializing the publisher: ', error.name, error.message);
          return;
        }
        session.publish(publisher, function(error) {
          if (error) {
            console.log('There was an error publishing: ', error.name, error.message);
          }
        });
      });
    } else {
      console.log('There was an error connecting to the session: ', error.name, error.message);
    }
  });
}
