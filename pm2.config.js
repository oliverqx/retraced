module.exports = {
  apps: [
    {
      name: "vector", // Name of the application (you can choose any name)
      script: "vector -w --config-dir /etc/vector/config",
      exec_interpreter: "none", // Don't use an interpreter
      instances: 1, // Number of instances to run (1 for a single instance)
      exec_mode: "fork", // Use "fork" as the execution mode
      log_date_format: "YYYY-MM-DD HH:mm:ss", // Log date format
      error_file: "logs/error.log", // Path to error log file
      out_file: "logs/out.log", // Path to standard output log file
    },
    {
      name: "sidecar", // Name of the application (you can choose any name)
      script: "node", // Use the "node" command
      args: [
        "/src/build/src/ee/_vector-sidecar/index.js", // Path to your Node.js application script
      ],
      instances: 1, // Number of instances to run (1 for a single instance)
      exec_mode: "fork", // Use "fork" as the execution mode
      log_date_format: "YYYY-MM-DD HH:mm:ss", // Log date format
      error_file: "logs/error.log", // Path to error log file
      out_file: "logs/out.log", // Path to standard output log file
    },
  ],
};
