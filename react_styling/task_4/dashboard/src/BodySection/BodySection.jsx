function BodySection({ title, children }) {
  return (
    <div className="BodySection px-4 py-2">
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      {children}
    </div>
  );
}

export default BodySection;
