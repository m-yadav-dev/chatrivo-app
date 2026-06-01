// 1. Global scope pollution and outdated declaration
var count = 10;

// 2. Production debugging code (Blocker)
console.log("Testing automated pipeline, count is: ", count);

// 3. Generic naming convention violation (Lowercase component name)
const index = () => {
  // 4. Loose equality violation
  let isEqual = count === 10 ? "Yes" : "No";
  console.log("Is count equal to 10? ", isEqual);
  return (
    <div style={{ padding: "20px", backgroundColor: "#f0f0f0", borderRadius: "5px" }}>
      <h1>Testing AI Bot Architecture</h1>
    </div>
  );
};

export default index;
