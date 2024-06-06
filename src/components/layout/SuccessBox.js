//quand les opérations sont bonnes on reçoit une bonne notification
export default function SuccessBox({children}) {
  return (
    <div className="text-center bg-green-100 p-4 rounded-lg border border-green-300">
      {children}
    </div>
  );
}