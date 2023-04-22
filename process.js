const process_name = process.argv.slice(2)[0];

count = 0;
while (true){
    count++;
    if(count==2000 || count==4000){
        console.log(`${process_name}: ${count}`);
    }
}


// Run the program using the node command: node process.js A &

// When you run the program, you will see output similar to the following:
// Output
// [1] 7754

// A: 2000
// A: 4000

// The number 7754 is a process ID that the operating system has assigned to it.