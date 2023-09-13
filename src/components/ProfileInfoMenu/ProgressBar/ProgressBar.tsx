import { useMediaQuery } from "react-responsive";

const ProgressBar = (props: { completed: number }) => {
  const isDesktop = useMediaQuery({
    query: "(min-width: 1201px)",
  });

  const { completed } = props;
  const containerStyles = {
    height: "8px",
    width: "100%",
    backgroundColor: isDesktop ? "#e0e0de" : " #2b3134",
  };

  const labelStyles = {
    padding: 5,
    color: "white",
    fontWeight: "bold",
  };
  return (
    <div style={containerStyles}>
      <div
        style={{
          height: "100%",
          width: `${completed}%`,
          backgroundColor: isDesktop ? "#2b3134" : "#00B2FD",
          borderRadius: "inherit",
          textAlign: "right",
        }}
      >
        <span style={labelStyles} role='progressbar'></span>
      </div>
    </div>
  );
};

export default ProgressBar;
