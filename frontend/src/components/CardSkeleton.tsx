import { Card, CardHeader, CardFooter } from "@progress/kendo-react-layout";
import { Skeleton } from "@progress/kendo-react-indicators";
import React from "react";
import { Box, Divider } from "@mui/material";

const CardSkeleton = ({ shape }: { shape: string }) => {
  return (
    <Card
      style={{
        width: "300px",
        padding: "16px",
        boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
        borderRadius: "12px",
        transition: "transform 0.3s ease-in-out",
        marginBottom: "16px",
      }}
    >
      <CardHeader className="k-hbox">
        <div
          style={{
            flex: "1 1 50%",
          }}
        >
          <Skeleton
            shape={"text"}
            style={{
              width: "100%",
            }}
            animation={{
              type: "wave",
            }}
          />
          <Skeleton
            shape={"text"}
            style={{
              width: "40%",
            }}
            animation={{
              type: "wave",
            }}
          />
        </div>
      </CardHeader>
      <Skeleton
        shape={"rectangle"}
        style={{
          width: "100%",
          height: 150,
        }}
        animation={{
          type: "wave",
        }}
      />
      <CardFooter style={{ display: "flex", justifyContent: "space-between" }}>
        <Skeleton
          shape={"rectangle"}
          style={{
            width: "25%",
            height: 25,
          }}
          animation={{
            type: "wave",
          }}
        />
        <Skeleton
          shape={"rectangle"}
          style={{
            width: "25%",
            height: 25,
          }}
          animation={{
            type: "wave",
          }}
        />
        <Skeleton
          shape={"rectangle"}
          style={{
            width: "25%",
            height: 25,
          }}
          animation={{
            type: "wave",
          }}
        />
      </CardFooter>
    </Card>
  );
};

export default CardSkeleton;
