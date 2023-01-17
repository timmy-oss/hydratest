export default function ProgressX({ progress }) {
  return (
    <div className="w-full relative h-[2px] bg-black/10 mt-12">
      <div
        style={{
          width: `${progress || 0}%`,
        }}
        className="h-[2px]  absolute top-0 bg-black/30"
      ></div>
    </div>
  );
}
