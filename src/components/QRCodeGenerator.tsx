import QRCode from "react-qr-code";
import React from "react";

interface Props {
  url: string;
  cellSize?: number | undefined;
}

export const QRCodeGenerator: React.FC<Props> = ({ url, cellSize }) => {
  return (
    <div
      style={{
        height: "auto",
        margin: "0 auto",
        maxWidth: cellSize,
        width: "100%",
      }}
    >
      <QRCode
        size={256}
        style={{ height: "auto", maxWidth: "100%", width: "100%" }}
        value={url}
        viewBox={`0 0 256 256`}
      />
    </div>
  );
};
