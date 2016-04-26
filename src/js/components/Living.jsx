import React from 'react';
export default class Living extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }
  componentDidMount() {
    const connection = new WebSocket('ws://223.252.202.69:9999')
    // When the connection is open, send some data to the server
    connection.onopen = function () {
      connection.send({"timestamp":"1459514381260","videoId":1,"userId":"1","random":"-2678371613059681964","action":"enter","roomId":1}); // Send the message 'Ping' to the server
    };

    // Log errors
    connection.onerror = function (error) {
      console.log('WebSocket Error ',  error);
    };

    // Log messages from the server
    connection.onmessage = function (e) {
      console.log('Server: ', e.data);
    };
  }
  render() {
    return <div>root</div>
  }
}