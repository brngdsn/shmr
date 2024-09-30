# Simple Static Server with Hot Module Reload (HMR)

A lightweight Node.js HTTP server for serving static files with built-in Hot Module Reload (HMR) support. Ideal for web development workflows, this tool automatically reloads your browser when you make changes to your files, enhancing productivity and streamlining the development process.

## Features

- **Static File Serving**: Serves HTML, CSS, JavaScript, JSON, images, and other static assets.
- **Hot Module Reload (HMR)**: Automatically reloads the browser when file changes are detected.
- **WebSocket Integration**: Utilizes WebSockets to communicate file changes to the client.
- **Easy to Use**: Simple setup with minimal configuration.
- **Global Installation**: Install globally via npm for easy access from any project.

## Installation

Ensure you have [Node.js](https://nodejs.org/) installed on your machine.

Install the package globally using npm:

```bash
npm install -g shmr
```

## Usage

Navigate to your project's root directory and start the server:

```bash
shmr
```

By default, the server runs at [http://localhost:8080](http://localhost:8080).

### Options

Currently, the server runs on port `8080` by default. To customize the port or add additional configurations, you can modify the source code as needed.

## How It Works

1. **HTTP Server**: Serves static files from the current directory. When a request is made, the server responds with the requested file. If an HTML file is requested, it injects a client-side HMR script before the closing `</body>` tag.

2. **HMR Client Script**: The injected script establishes a WebSocket connection to the server. It listens for `reload` messages and refreshes the page when a change is detected.

3. **WebSocket Server**: Manages WebSocket connections with clients. When a file change is detected, it broadcasts a `reload` message to all connected clients.

4. **File Watching**: Monitors the current directory recursively for any file changes (excluding hidden files). Upon detecting a change, it logs the event and triggers a browser reload via WebSocket.

## Example

1. **Start the Server**:

   ```bash
   shmr
   ```

2. **Open Your Browser**:

   Navigate to [http://localhost:8080](http://localhost:8080). Your static site should load with HMR enabled.

3. **Make Changes**:

   Modify any HTML, CSS, or JavaScript files in your project. The browser will automatically reload to reflect the changes.

## Development

If you wish to contribute or modify the server, follow these steps:

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/brngdsn/shmr.git
   ```

2. **Navigate to the Project Directory**:

   ```bash
   cd shmr
   ```

3. **Install Dependencies**:

   ```bash
   npm install
   ```

4. **Run Locally**:

   ```bash
   node src/index.js
   ```

## License

MIT © [brngdsn](https://github.com/brngdsn)

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any bugs, features, or enhancements.

---

*This project is a simple static server with HMR capabilities, designed to improve your web development experience by providing instant feedback on file changes.*
