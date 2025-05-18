let historique = JSON.parse(localStorage.getItem("historique")) || [];

function calculer() {
  const salaire = parseFloat(document.getElementById("salaire").value) || 0;
  const autresRevenus = parseFloat(document.getElementById("autresRevenus").value) || 0;
  const totalRevenus = salaire + autresRevenus;

  const loyer = parseFloat(document.getElementById("loyer").value) || 0;
  const energie = parseFloat(document.getElementById("energie").value) || 0;
  const transport = parseFloat(document.getElementById("transport").value) || 0;
  const assurance = parseFloat(document.getElementById("assurance").value) || 0;
  const depensesFixes = loyer + energie + transport + assurance;

  const courses = parseFloat(document.getElementById("courses").value) || 0;
  const loisirs = parseFloat(document.getElementById("loisirs").value) || 0;
  const shopping = parseFloat(document.getElementById("shopping").value) || 0;
  const sorties = parseFloat(document.getElementById("sorties").value) || 0;
  const depensesVariables = courses + loisirs + shopping + sorties;

  const totalDepenses = depensesFixes + depensesVariables;
  const epargneSouhaitee = parseFloat(document.getElementById("epargne").value) || 0;
  const reste = totalRevenus - totalDepenses;
  const peutEpargner = reste >= epargneSouhaitee;

  let message = `
    <h3>📊 Résultats</h3>
    <p><strong>Total des revenus :</strong> ${totalRevenus.toFixed(2)} Ar</p>
    <p><strong>Total des dépenses :</strong> ${totalDepenses.toFixed(2)} Ar</p>
    <p><strong>Reste à disposition :</strong> ${reste.toFixed(2)} Ar</p>
    <p><strong>Objectif d'épargne :</strong> ${epargneSouhaitee.toFixed(2)} Ar</p>
  `;

  if (peutEpargner) {
    message += `<p style="color: green;">✅ Vous pouvez atteindre votre objectif d'épargne ce mois-ci !</p>`;
    notify("🎉 Objectif atteint !");
  } else {
    message += `<p style="color: red;">❌ Réduisez vos dépenses pour atteindre votre objectif.</p>`;
    notify("⚠️ Budget serré !");
  }

  document.getElementById("resultat").innerHTML = message;

  const now = new Date();
  const mois = now.toLocaleString('default', { month: 'long', year: 'numeric' });

  const dejaPresent = historique.some(entry => entry.mois === mois);
  if (!dejaPresent) {
    historique.push({
      mois,
      revenus: totalRevenus,
      depenses: totalDepenses,
      reste,
      epargne: epargneSouhaitee,
      atteint: peutEpargner
    });
    localStorage.setItem("historique", JSON.stringify(historique));
    afficherHistorique();
  }
}

function afficherHistorique() {
  const ul = document.getElementById("historique");
  ul.innerHTML = "";
  historique.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `${item.mois} | `;
    li.textContent += `Revenus: ${item.revenus.toFixed(2)} Ar | `;
    li.textContent += `Dépenses: ${item.depenses.toFixed(2)} Ar | `;
    li.textContent += `Épargne: ${item.epargne.toFixed(2)} Ar → `;
    li.textContent += item.atteint ? "✅ Atteint" : "❌ Non-atteint";
    ul.appendChild(li);
  });
}

function notify(message) {
  const div = document.createElement("div");
  div.style.position = "fixed";
  div.style.bottom = "20px";
  div.style.right = "20px";
  div.style.backgroundColor = "#333";
  div.style.color = "#fff";
  div.style.padding = "12px 20px";
  div.style.borderRadius = "6px";
  div.style.zIndex = "1000";
  div.style.animation = "slideIn 0.5s ease-out, slideOut 0.5s ease-in 4s forwards";
  div.textContent = message;
  document.body.appendChild(div);
  setTimeout(() => div.remove(), 5000);
}

// Animations CSS pour la notification
const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from { transform: translateX(100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
  @keyframes slideOut {
    from { transform: translateX(0); opacity: 1; }
    to { transform: translateX(100%); opacity: 0; }
  }
`;
document.head.appendChild(style);

window.onload = afficherHistorique;
