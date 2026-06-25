import { getMyApplications } from "@/lib/services/jobApplications.service";
import { getMyFeedbacks } from "@/lib/services/feedbacks.service";
import { auth } from "@/auth";
import { getStages } from "@/lib/services/stages.service";

export const dynamic = 'force-dynamic';

export default async function ApplicantDashboardPage() {
  const session = await auth();
  const token = session?.accessToken as string;
  
  const [applications, feedbacks, stages] = await Promise.all([
    getMyApplications(token),
    getMyFeedbacks(token),
    getStages(token),
  ]);

  const totalApplications = applications?.length || 0;
  const totalFeedbacks = feedbacks?.length || 0;
  
  const counts = stages.reduce((acc, stage) => {
    acc[stage.name.toLowerCase()] = 0;
    return acc;
  }, {} as Record<string, number>);

  applications.forEach((app) => {
    const stageName = app.currentStage?.name?.toLowerCase();
    if (counts.hasOwnProperty(stageName)) {
      counts[stageName]++;
    }
  });


  return (
    <main className="p-6 md:p-12 min-h-screen bg-main">

      <div>
        <h1 className="text-3xl font-bold text-gray-100">Resumen de Actividad</h1>
        <p className="text-gray-400 mt-2">
          Seguí el estado de tus postulaciones y métricas recientes.
        </p>
      </div>

      <section id="counters" className="mt-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 shadow-sm flex flex-col justify-center items-center">
            <span className="text-gray-400 font-medium mb-1 uppercase text-sm tracking-wider">
              Total de Postulaciones
            </span>
            <span className="text-5xl font-bold text-blue-500">
              {totalApplications}
            </span>
          </div>
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 shadow-sm flex flex-col justify-center items-center">
            <span className="text-gray-400 font-medium mb-1 uppercase text-sm tracking-wider">
              Feedbacks Recibidos
            </span>
            <span className="text-5xl font-bold text-amber-500">
              {totalFeedbacks}
            </span>
          </div>
        </div>
      </section>

      <section id="stages-counters" className="mt-10">
        <h2 className="text-xl font-bold text-gray-100 mb-6">Desglose por Etapas</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stages.map((stage, index) => {
            const colors = [
              "text-emerald-500",
              "text-yellow-500",
              "text-purple-500",
              "text-rose-500",
            ];
            const colorClass = colors[index % colors.length];
            return (
              <div
                key={stage.id}
                className="bg-gray-800 border border-gray-700 rounded-xl p-6 shadow-sm flex flex-col justify-center items-center"
              >
                <span className="text-gray-400 font-medium mb-1 text-center">
                  {stage.name}
                </span>
                <span className={`text-5xl font-bold ${colorClass}`}>
                  {counts[stage.name.toLowerCase()] || 0}
                </span>
              </div>
            );
          })}
        </div>
      </section>
      
    </main>
  );
}