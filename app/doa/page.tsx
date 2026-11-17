import type { Metadata } from 'next';
export const metadata: Metadata = { title: 'Doa Harian' };
export const revalidate = 86400;
type Doa = { id: number; nama: string; ar: string; tr: string; idn: string };
export default async function DoaPage() {
  let d: Doa[] = [];
  try {
    const r = await fetch('https://equran.id/api/doa', { next: { revalidate: 86400 } });
    const j = await r.json();
    d = Array.isArray(j) ? j : j.data;
  } catch {}
  return (
    <div className="space-y-3">
      <h1 className="font-display text-2xl font-bold">Doa Harian</h1>
      {!d?.length && <p className="py-10 text-center text-mute">Doa gagal dimuat. Muat ulang halaman ini.</p>}
      {d?.map((x) => (
        <article key={x.id ?? x.nama} className="card">
          <b>{x.nama}</b>
          <p className="ar font-arab text-3xl">{x.ar}</p>
          <p className="italic text-em">{x.tr}</p>
          <p>{x.idn}</p>
        </article>
      ))}
    </div>
  );
}
