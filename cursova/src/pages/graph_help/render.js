export const renderComps = (comps) => (
    <div>
      <h3>SCC Components</h3>
      {comps.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Component</th>
              <th>Nodes</th>
            </tr>
          </thead>
          <tbody>
            {comps.map((c, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{c.join(", ")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Run the algorithm to see the components.</p>
      )}
    </div>
  );
  