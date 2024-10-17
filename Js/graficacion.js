// Función para guardar los datos en localStorage
function saveData(alumnos, alumnas) {
  localStorage.setItem('alumnos', alumnos);
  localStorage.setItem('alumnas', alumnas);
}

// Función para cargar los datos desde localStorage
function loadData() {
  const alumnos = localStorage.getItem('alumnos');
  const alumnas = localStorage.getItem('alumnas');
  return { alumnos, alumnas };
}

// Función para inicializar el gráfico
function initializeChart(alumnos, alumnas) {
  const ctx = document.getElementById('myChart').getContext('2d');
  if (window.myChart instanceof Chart) {
      window.myChart.destroy();
  }
  window.myChart = new Chart(ctx, {
      type: 'bar',
      data: {
          labels: ['Alumnas Embarazadas', 'Alumnas No Embarazadas'],
          datasets: [{
              label: 'Cantidad',
              data: [alumnos, alumnas],
              backgroundColor: ['#007BFF', '#FF6384'],
              borderColor: ['#0056b3', '#FF6384'],
              borderWidth: 1
          }]
      },
      options: {
          scales: {
              y: {
                  beginAtZero: true,
                  ticks: {
                      stepSize: 1
                  }
              }
          }
      }
  });
}

document.getElementById('dataForm').addEventListener('submit', function(e) {
  e.preventDefault();

  // Obtener valores de los inputs
  const alumnos = document.getElementById('alumnos').value;
  const alumnas = document.getElementById('alumnas').value;

  // Validar que los valores sean mayores a 0
  if (alumnos <= 0 || alumnas <= 0) {
      alert('Los valores deben ser mayores a 0');
      return;
  }

  // Guardar los datos en localStorage
  saveData(alumnos, alumnas);

  // Crear el gráfico
  initializeChart(alumnos, alumnas);
});

document.getElementById('clearFields').addEventListener('click', function() {
  document.getElementById('alumnos').value = '';
  document.getElementById('alumnas').value = '';
});

document.getElementById('clearChart').addEventListener('click', function() {
  if (window.myChart instanceof Chart) {
      window.myChart.destroy();
  }
  localStorage.removeItem('alumnos');
  localStorage.removeItem('alumnas');
});

// Cargar los datos desde localStorage y crear el gráfico si existen
window.addEventListener('load', function() {
  const data = loadData();
  if (data.alumnos && data.alumnas) {
      document.getElementById('alumnos').value = data.alumnos;
      document.getElementById('alumnas').value = data.alumnas;
      initializeChart(data.alumnos, data.alumnas);
  }
});
