function calculer() {
  // Revenus
  const salaire = parseFloat(document.getElementById("salaire").value) || 0;
  const autresRevenus = parseFloat(document.getElementById("autresRevenus").value) || 0;
  const totalRevenus = salaire + autresRevenus;

  // Dépenses fixes
  const loyer = parseFloat(document.getElementById("loyer").value) || 0;
  const energie = parseFloat(document.getElementById("energie").value) || 0;
  const transport = parseFloat(document.getElementById("transport").value) || 0;
  const assurance = parseFloat(document.getElementById("assurance").value) || 0;
  const depensesFixes = loyer + energie + transport + assurance;

  // Dépenses variables
  const courses = parseFloat(document.getElementById("courses").value) || 0;
  const loisirs = parseFloat(document.getElementById("loisirs").value) || 0;
  const shopping = parseFloat(document.getElementById("shopping").value) || 0;
  const sorties = parseFloat(document.getElementById("sorties").value) || 0;
  const depensesVariables = courses + loisirs + shopping + sorties;

  const totalDepenses = depensesFixes + depensesVariables;

  // Épargne souhaitée
  const epargneSouhaitee = parseFloat(document.getElementById("epargne").value) || 0;

  // Calcul final
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
  } else {
    message += `<p style="color: red;">❌ Vous devriez réduire vos dépenses pour atteindre votre objectif.</p>`;
  }

  document.getElementById("resultat").innerHTML = message;
}