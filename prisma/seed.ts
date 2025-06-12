import { DailyLog, PrismaClient, Reference, Vessel } from '@prisma/client';
const fs = require('fs');

const prisma = new PrismaClient();

const main = async () => {
  const vessels: Vessel[] = JSON.parse(
    fs.readFileSync('./jsons/vessels.json', 'utf-8'),
  );
  const dailyLogs: DailyLog[] = JSON.parse(
    fs.readFileSync('./jsons/daily-log-emissions.json', 'utf-8'),
  );
  const references: Reference[] = JSON.parse(
    fs.readFileSync('./jsons/pp-reference.json', 'utf-8'),
  );

  vessels.forEach(async (vessel) => {
    await prisma.vessel.create({ data: { ...vessel } });
  });

  references.forEach(async (reference) => {
    await prisma.reference.create({ data: { ...reference } });
  });

  dailyLogs.forEach(async (log) => {
    const vessel = await prisma.vessel.findUnique({
      where: { IMONo: log.VesselID },
    });
    if (!vessel) {
      return;
    }

    await prisma.dailyLog.create({
      data: {
        ...log,
        FromUTC: new Date(log.FromUTC),
        TOUTC: new Date(log.TOUTC),
        CreatedAt: new Date(log.CreatedAt),
        UpdatedAt: new Date(log.UpdatedAt),
      },
    });
  });
};

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
