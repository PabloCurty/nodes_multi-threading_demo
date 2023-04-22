
# nodes_simulating_multi-threading_demo

Understanding Processes and Threads. Before you start writing CPU-bound tasks and offloading them into separate threads, you first need to understand what processes and threads are and the differences between them. Most importantly, you will review how processes and threads run on a single or multi-core computer system.
## Content

- Run a single process using the node command
- Show how many threads has inside the single process
- Stop all currently running Node processes
- Run four process using the node command
- Conclusion of how nodes handle with process, and how can we simulate a multi threading plataforma with nodejs


## Tutorial

1) Run the program(process) using the node command: 
```bash
  node process.js A &
```

When you run the program, you will see output similar to the following:
```bash
[1] 7754
A: 2000
A: 4000
```
Obs: The number 7754 is a process ID that the operating system has assigned to it.

2) to show how many threads has inside de process: 
```bash
  ps -M 7754
```
Resut:
```bash
USER         PID   TT   %CPU STAT PRI     STIME     UTIME COMMAND
pablocurty  7754 s002   98.3 R    31T   0:00.20   0:20.09 node process.js A
            7754         0.0 S    31T   0:00.00   0:00.00 
            7754         0.1 S    31T   0:00.02   0:00.00 
            7754         0.1 S    31T   0:00.02   0:00.00 
            7754         0.1 S    31T   0:00.02   0:00.00 
            7754         0.1 S    31T   0:00.02   0:00.00 
            7754         0.0 S    31T   0:00.00   0:00.00 
```

As you can see from the output, the Node.js process has seven threads in total: 
one main thread for executing JavaScript, four Node.js threads, and two V8 threads.

3) stop all currently running Node processes with the command kill: 
```bash
sudo kill -9 `pgrep node` 
```

4) Run the 4 process using the node command:
```bash
node process.js A & node process.js B & node process.js C & node process.js D &
```

5) Output
```bash
[1] 36896
[2] 36897
[3] 36898
[4] 36899
C: 2000
B: 2000
A: 2000
D: 2000
B: 4000
D: 4000
A: 4000
```


## Learning

CONCLUSION:
On a single-core machine, processes run one at a time. That is, the operating system switches between processes 
at regular intervals. For example, process D runs for a limited time, then its state is saved somewhere, and the 
operating system schedules process B to run for a limited time, and so on. This goes back and forth until all 
tasks have been completed. From the output it might look like each process has run to completion, but in reality 
the OS scheduler is constantly switching between them.

On a multicore system, assuming you have four cores, the operating system schedules each process to run on each 
core at the same time. This is known as parallelism. However, if you create four more processes (bringing the 
total to eight), each core will run two processes, one at a time, until they complete.

Remenber, JS is single thread, but nodes (with libuv library), and V8 delivery more 6 threads, and simulate a
multi threading platform. the Node.js process has seven threads in total: 
one main thread for executing JavaScript, four Node.js threads (to run I/O), and two V8 threads (to run thinks like
garbage colector).

If you wanna more threads, to handle thinks in a CPU for example, you can use a native nodes library called 
worker-threads.
