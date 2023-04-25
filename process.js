const process_name = process.argv.slice(2)[0];

count = 0;
while (true){
    count++;
    if(count==2000 || count==4000){
        console.log(`${process_name}: ${count}`);
    }
}

/*
RUN ONE PROCESS
Run the program using the node command: node process.js A &

When you run the program, you will see output similar to the following:
Output
[1] 7754
A: 2000
A: 4000
The number 7754 is a process ID that the operating system has assigned to it.

to show how many threads has inside de process: ps -M 7754

resut:
USER         PID   TT   %CPU STAT PRI     STIME     UTIME COMMAND
pablocurty  7754 s002   98.3 R    31T   0:00.20   0:20.09 node process.js A
            7754         0.0 S    31T   0:00.00   0:00.00 
            7754         0.1 S    31T   0:00.02   0:00.00 
            7754         0.1 S    31T   0:00.02   0:00.00 
            7754         0.1 S    31T   0:00.02   0:00.00 
            7754         0.1 S    31T   0:00.02   0:00.00 
            7754         0.0 S    31T   0:00.00   0:00.00 

As you can see from the output, the Node.js process has seven threads in total: 
one main thread for executing JavaScript, four Node.js threads, and two V8 threads.


stop all currently running Node processes with the command kill: sudo kill -9 `pgrep node` 

RUN FOUR PROCESSES
comand
node process.js A & node process.js B & node process.js C & node process.js D &
output
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

KILL:
[4]  + killed     node process.js D
pablocurty@PabloCurty-MacBook-Pro multi-threading_demo % 
[3]  + killed     node process.js C
pablocurty@PabloCurty-MacBook-Pro multi-threading_demo % 
[1]  - killed     node process.js A
pablocurty@PabloCurty-MacBook-Pro multi-threading_demo % 
[2]  + killed     node process.js B
pablocurty@PabloCurty-MacBook-Pro multi-threading_demo % 

*/ 

/* 
On a single-core machine, processes run one at a time. That is, the operating system switches between processes 
at regular intervals. For example, process D runs for a limited time, then its state is saved somewhere, and the 
operating system schedules process B to run for a limited time, and so on. This goes back and forth until all 
tasks have been completed. From the output it might look like each process has run to completion, but in reality 
the OS scheduler is constantly switching between them.

On a multicore system, assuming you have four cores, the operating system schedules each process to run on each 
core at the same time. This is known as parallelism. However, if you create four more processes (bringing the 
total to eight), each core will run two processes, one at a time, until they complete.
*/