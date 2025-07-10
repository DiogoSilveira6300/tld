import { useState, useEffect } from "react";
import { useDAOContract } from "../hooks/useDAOContract";

export default function ProposalList({ daoAddress }) {
  const dao = useDAOContract(daoAddress);
  const [proposals, setProposals] = useState([]);

  async function loadProposals() {
    const ids = [0, 1, 2]; // Static for demo. You should fetch count from contract in future
    const all = await Promise.all(
      ids.map(async (id) => {
        try {
          const p = await dao.getProposal(id);
          return { id, ...p };
        } catch {
          return null;
        }
      })
    );
    setProposals(all.filter(Boolean));
  }

  async function voteOn(id) {
    try {
      const tx = await dao.vote(id);
      await tx.wait();
      alert("Vote cast successfully");
      loadProposals();
    } catch (err) {
      alert("Voting failed: " + err.message);
    }
  }

  useEffect(() => {
    if (dao) loadProposals();
  }, [dao]);

  return (
    <div>
      <h2 className="text-xl font-bold">Proposals</h2>
      <ul>
        {proposals.map((p) => (
          <li key={p.id} className="border p-2 my-2">
            <p><strong>{p.description}</strong></p>
            <p>Votes: {p.voteCount.toString()}</p>
            <p>Deadline: {new Date(p.deadline * 1000).toLocaleString()}</p>
            <button onClick={() => voteOn(p.id)}>Vote</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
