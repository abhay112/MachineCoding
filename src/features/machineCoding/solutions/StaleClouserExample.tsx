import { useState } from "react";



// How to reproduce the bug (IMPORTANT)

// Page loads → count = 0

// Click “Log count after 3s”

// Immediately click “Increment Count”

// UI shows count = 1

// Wait 3 seconds

// Console prints:

// Logged count: 0


// ❌ Wrong → you EXPECT 1


const StaleClosureExample = () => {
  const [count, setCount] = useState(0);

  const handleLogAfterDelay = () => {
    setTimeout(() => {
      console.log("Logged count:", count);
      setCount((prev) =>{
        console.log("Previous count in setCount:", prev);
        return prev;
      })
    }, 2000);
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Count: {count}</h2>

      <button onClick={() => setCount(count + 1)}>
        Increment Count
      </button>

      <button onClick={handleLogAfterDelay} style={{ marginLeft: 10 }}>
       click here Log count after 3s
      </button>
    </div>
  );
}

export default StaleClosureExample;
