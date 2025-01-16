import { io } from "socket.io-client";

class WebSocketService {
  socket = null;

  getTokenFromCookies(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
      return parts.pop().split(';').shift();
    }
    return null;
  }

  connect(url) {
    const token = this.getTokenFromCookies("accessToken");

    if (!token) {
      console.error("No accessToken found in cookies");
      return;
    }

    this.socket = io(url, {
      auth: {
        token: token,
      },
    });

    // console.log("this.token = ", token);

    this.socket.on("connect", () => {
      console.log("WebSocket connection established");
    });

    this.socket.on("connect_error", (error) => {
      console.error("WebSocket connection error:", error.message, error);
    });

    this.socket.on("disconnect", () => {
      console.log("WebSocket connection closed");
    });
  }

  onMessage(callback) {
    if (!this.socket) {
      console.error("WebSocket connection is not established");
      return;
    }

    this.socket.on("DAILY_SALES_COUNT", (data) => {
      // console.log("WebSocket message received:");

      sessionStorage.setItem('totalSales', data.totalAmount || 0);
      sessionStorage.setItem('totalCash', data.cash || 0);
      sessionStorage.setItem('totalOnline', data.online || 0);

      callback(data);
    });
  }

  disconnect() {
    if (this.socket) {
      console.log("Disconnecting WebSocket...");
      this.socket.disconnect();
    }
  }
}

const socketService = new WebSocketService();
export default socketService;
