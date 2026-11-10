(function () {
  const bt = document.getElementById("send");
  const input = document.getElementById("country");
  const res = document.getElementById("res");

  bt.addEventListener("click", async function () {
    const response = await fetch(
      `https://api.restcountries.com/countries/v5?q=${input.value}`,
      {
        headers: {
          Authorization: "Bearer rc_live_58b27fcd6c304866994f6b8aa3b08e37",
        },
      },
    );
    if (response.ok === true) {
      const result = await response.json();
      if (result.data.meta.count != 0) {
        const objects = result.data.objects;
        console.log(objects);
        let html = `<table border='1'>
        <tr> 
          <th>Name</th>
          <th>Capital</th>
          <th>Population</th>
          <th>Region</th>
          <th>Subregion</th>
        </tr>
        `;
        objects.forEach((el) => {
          html += `
          <tr>
            <td>${el.names.common}</td>
            <td>${el.capitals?.[0]?.name || "Brak"}</td>
            <td>${el.population}</td>
            <td>${el.region}</td>
            <td>${el.subregion}</td>
          </tr>
          `;
        });
        html += `</table>`;
        console.log(html);
        res.innerHTML = html;
      } else {
        res.innerHTML = "BRAK WYNIKÓW";
      }
    } else {
      res.innerHTML = "WYSTĄPIŁ BŁĄD " + response.status;
    }
  });
})();
