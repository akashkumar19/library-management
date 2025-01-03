import { Box } from "@mui/material";
import { Skeleton } from "@progress/kendo-react-indicators";
import { Card, CardFooter, CardHeader } from "@progress/kendo-react-layout";

const CardSkeleton = () => {
  const cardSkeleton = () => {
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
        <CardFooter
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <Skeleton
            shape={"rectangle"}
            style={{
              width: "25%",
              height: 25,
              borderRadius: 3,
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
              borderRadius: 3,
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
              borderRadius: 3,
            }}
            animation={{
              type: "wave",
            }}
          />
        </CardFooter>
      </Card>
    );
  };
  const buildCardSkeleton = (no: number) => {
    const cardSkeletonList = [];
    for (let i = 0; i < no; i++) {
      cardSkeletonList.push(cardSkeleton());
    }
    return cardSkeletonList;
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 2,
          padding: 2,
          marginBottom: 3,
          alignItems: "center",
          backgroundColor: "#f5f5f5",
          borderRadius: "8px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Skeleton
          shape="rectangle"
          style={{ width: "30%", height: 40, borderRadius: 4 }}
        />
        <Skeleton
          shape="rectangle"
          style={{ width: "30%", height: 40, borderRadius: 4 }}
        />
        <Skeleton
          shape="rectangle"
          style={{ width: "30%", height: 40, borderRadius: 4 }}
        />
        <Skeleton
          shape="rectangle"
          style={{ width: "6%", height: 28, borderRadius: 3 }}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: "2rem",
          justifyContent: "center",
          alignItems: "flex-start",
          padding: 3,
        }}
      >
        {buildCardSkeleton(6)}
      </Box>
    </>
  );
};

export default CardSkeleton;
