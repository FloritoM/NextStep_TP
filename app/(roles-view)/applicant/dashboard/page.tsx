// app/applicant/dashboard/page.tsx

export default async function ApplicantDashboardPage() {
  // TODO: Reemplazar con llamadas reales al backend cuando el interceptor/logs estén listos
  // Ej: const stats = await getApplicantStats(userId);
  // Ej: const recentActivity = await getRecentLogs(userId);

  // --- DATOS DE PRUEBA (MOCKS) ---
  const stats = {
    totalApplications: 12,
    totalFeedbacks: 4,
    stages: {
      applied: 5,
      technicalTest: 3,
      interview: 3,
      offer: 1,
    }
  };

  const activities = [
    {
      id: 1,
      date: '2026-06-10',
      action: 'Te postulaste a la vacante',
      target: 'Data Engineer - Digital NAO',
      type: 'application'
    },
    {
      id: 2,
      date: '2026-06-08',
      action: 'Recibiste feedback en la vacante',
      target: 'Data Analyst Jr',
      type: 'feedback'
    },
    {
      id: 3,
      date: '2026-06-05',
      action: 'Avanzaste a Prueba Técnica en',
      target: 'Backend Developer (Node.js/PostgreSQL)',
      type: 'stage_change'
    }
  ];
  // -------------------------------

  return (
    <div className="flex flex-col gap-8 text-gray-100">
      
      {/* Encabezado */}
      <div>
        <h1 className="text-3xl font-bold">Resumen de Actividad</h1>
        <p className="text-gray-400 mt-2">Seguí el estado de tus postulaciones y métricas recientes.</p>
      </div>

      {/* Tarjetas de Métricas Principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 shadow-sm flex flex-col justify-center items-center">
          <span className="text-gray-400 font-medium mb-1">Total de Postulaciones</span>
          <span className="text-5xl font-bold text-amber-500">{stats.totalApplications}</span>
        </div>
        
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 shadow-sm flex flex-col justify-center items-center">
          <span className="text-gray-400 font-medium mb-1">Feedbacks Recibidos</span>
          <span className="text-5xl font-bold text-blue-500">{stats.totalFeedbacks}</span>
        </div>
      </div>

      {/* Métricas por Etapa (Stages) */}
      <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 shadow-sm">
        <h2 className="text-xl font-semibold mb-4">Postulaciones por Etapa</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gray-900 rounded-lg p-4 text-center">
            <p className="text-gray-400 text-sm">Enviadas</p>
            <p className="text-2xl font-bold">{stats.stages.applied}</p>
          </div>
          <div className="bg-gray-900 rounded-lg p-4 text-center">
            <p className="text-gray-400 text-sm">Prueba Técnica</p>
            <p className="text-2xl font-bold text-amber-400">{stats.stages.technicalTest}</p>
          </div>
          <div className="bg-gray-900 rounded-lg p-4 text-center">
            <p className="text-gray-400 text-sm">Entrevistas</p>
            <p className="text-2xl font-bold text-purple-400">{stats.stages.interview}</p>
          </div>
          <div className="bg-gray-900 rounded-lg p-4 text-center">
            <p className="text-gray-400 text-sm">Ofertas</p>
            <p className="text-2xl font-bold text-green-500">{stats.stages.offer}</p>
          </div>
        </div>
      </div>

      {/* Timeline de Actividad Reciente */}
      <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 shadow-sm">
        <h2 className="text-xl font-semibold mb-6">Actividad Reciente</h2>
        
        <div className="relative border-l border-gray-700 ml-3 space-y-8">
          {activities.map((activity) => (
            <div key={activity.id} className="relative pl-8">
              {/* Círculo del Timeline */}
              <div className="absolute -left-1.5 top-1.5 h-3 w-3 rounded-full bg-amber-500 ring-4 ring-gray-800"></div>
              
              <div className="flex flex-col">
                <span className="text-sm text-gray-400 mb-1">
                  {new Date(activity.date).toLocaleDateString('es-AR', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}
                </span>
                <p className="text-gray-200">
                  {activity.action} <span className="font-semibold text-white">{activity.target}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
        
        {activities.length === 0 && (
          <p className="text-gray-400 text-center py-4">Aún no hay actividad reciente para mostrar.</p>
        )}
      </div>

    </div>
  );
}