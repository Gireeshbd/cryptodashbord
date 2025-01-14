import React from "react";
import styled from "styled-components";
import { useGetMarketsQuery } from "../../features/api/coinApiSlice";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(ArcElement, Tooltip, Legend);

const Container = styled.div`
  width: 50%;
  height: 100%;
  margin: 1%;
  border-radius: 10px;
  box-shadow: 0px 10px 24px 0px rgba(0, 0, 0, 0.1);
  @media (max-width: 424px) {
    width: 100%;
  }
`;
const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1%;
`;

const Top = styled.div`
  display: flex;
  flex: 20%;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.p`
  font-weight: 800;
  font-size: clamp(1rem, 1vw + 0.5rem, 1.5rem);
  @media (max-width: 768px) {
    font-size: clamp(1rem, 0.8vw + 0.5rem, 1.5rem);
  }
`;
const TotalValue = styled.p`
  color: gray;
  font-size: calc(0.5vw + 0.5rem);
`;
const Bottom = styled.div`
  flex: 80%;
  width: 100%;
  height: 100%;
`;

function PieChart() {
  const { data: marketData, isFetching } = useGetMarketsQuery();
  if (isFetching) return "Loading....";

  const data = {
    labels: marketData?.slice(0, 3).map((coin) => coin.name),
    datasets: [
      {
        data: marketData.slice(0, 3).map((coin) => coin.total_volume),
        backgroundColor: [
          "rgb(128, 0, 128)",
          "rgb(0, 32, 128)",
          "rgb(128, 128, 0)",
        ],
        borderWidth: 1,
        borderColor: "rgb(255, 255, 255)",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      animateScale: true,
    },
    plugins: {
      legend: {
        position: "right",
        align: "center",
        display: true,
        padding: 30,
        labels: {
          color: "rgb(67, 67, 177)",

          font: {
            size: 10,
          },
        },
      },
      datalabels: {
        display: true,
        color: "rgb(255, 255, 255)",
        align: "center",
        formatter: (value, ctx) => {
          let sum = 0;
          let dataArr = ctx.chart.data.datasets[0].data;
          dataArr.map((data) => {
            sum += data;
          });
          let percentage = "$" + ((value * 1000) / sum).toFixed(2);
          return percentage;
        },
        color: "#fff",

        labels: {
          title: {
            font: {
              weight: "bold",
              size: 12,
            },
          },
        },
      },
    },
  };

  return (
    <Container>
      <Wrapper>
        <Top>
          <Title>Portfolio</Title>
          <TotalValue>
            Total value <strong>$1000</strong>
          </TotalValue>
        </Top>
        <Bottom>
          <Pie data={data} options={options} plugins={[ChartDataLabels]} />
        </Bottom>
      </Wrapper>
    </Container>
  );
}

export default PieChart;
