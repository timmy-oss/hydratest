import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  Image,
  StyleSheet,
  Link,
  Font,
} from "@react-pdf/renderer";

// Font.register({
//   family: "Mulish",
//   src: "https://fonts.cdnfonts.com/css/mulish",
// });

const styles = StyleSheet.create({
  page: {
    flexDirection: "col",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
    width: "100%",
    // fontFamily: "Mulish",
  },

  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    textTransform: "capitalize",
    fontSize: "12px",
    fontWeight: "normal",
    padding: "2px",
    paddingBottom: "4px",
    marginBottom: "12px",
    borderBottom: "1px solid #E5E7EB",
  },

  mapSection: {
    height: "3px",
    flexGrow: "1",
  },
});

function scoreColor(score) {
  if (score >= 0 && score <= 40) return "#DC143C";
  if (score >= 41 && score <= 50) return "yellow";
  if (score >= 51 && score <= 60) return "orange";
  if (score >= 61 && score <= 70) return "green";
  if (score >= 71 && score <= 100) return "blue";
}

export default function ResultPdf(props) {
  const mapWidth = (1 / props.total_attempts) * 100;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              style={{
                width: 180,
                height: 200,
                objectFit: "contain",
              }}
              src="/assets/hydratest.png"
            />
            <Text
              style={{
                fontWeight: "bold",
                fontSize: "20px",
                textAlign: "left",
                color: "#5522A9",
              }}
            >
              HydraTest
            </Text>
          </View>

          <View
            style={{
              padding: "20px",
              width: "100%",
            }}
          >
            <Text
              style={{
                fontWeight: "bold",
                fontSize: "16px",
                textAlign: "center",
                textTransform: "uppercase",
                backgroundColor: "black",
                color: "white",
                paddingVertical: "4px",
              }}
            >
              Exam Result &nbsp;&nbsp;#{props.id}
            </Text>

            <View
              style={{
                minHeight: "300px",
                margin: "auto",
                padding: "15px",
                backgroundColor: "#5522A9",
                color: "white",
                textAlign: "center",
                marginTop: "45px",
                width: "80%",
                minWidth: "250px",
              }}
            >
              <View style={styles.infoRow}>
                <Text>Exam</Text>

                <Text
                  style={{
                    fontWeight: "bold",
                  }}
                >
                  {props.exam_name}
                </Text>
              </View>

              <View style={styles.infoRow}>
                <Text>Course</Text>

                <Text
                  style={{
                    fontWeight: "bold",
                  }}
                >
                  {props.course_name}
                </Text>
              </View>

              <View style={styles.infoRow}>
                <Text>Questions</Text>

                <Text
                  style={{
                    fontWeight: "bold",
                  }}
                >
                  {props.total_attempts}
                </Text>
              </View>

              <View style={styles.infoRow}>
                <Text>Attempts</Text>

                <Text
                  style={{
                    fontWeight: "bold",
                  }}
                >
                  {props.attempts}
                </Text>
              </View>

              <View style={styles.infoRow}>
                <Text>Correct Attempts</Text>

                <Text
                  style={{
                    fontWeight: "bold",
                  }}
                >
                  {props.correct_attempts}
                </Text>
              </View>

              <View style={styles.infoRow}>
                <Text>Incorrect Attempts</Text>

                <Text
                  style={{
                    fontWeight: "bold",
                  }}
                >
                  {props.incorrect_attempts}
                </Text>
              </View>

              <View style={styles.infoRow}>
                <Text>Score</Text>

                <Text
                  style={{
                    color: scoreColor(props.score),
                    fontWeight: "bold",
                  }}
                >
                  {props.score} %
                </Text>
              </View>

              <View style={styles.infoRow}>
                <Text>Remark</Text>

                <Text
                  style={{
                    color: scoreColor(props.score),
                    fontWeight: "bold",
                    textTransform: "uppercase",
                  }}
                >
                  {props.remark}
                </Text>
              </View>

              {/* Map  */}

              <View style={styles.infoRow}>
                <Text>Performance Map </Text>

                <View
                  style={{
                    height: "3px",
                    flexDirection: "row",
                    alignItems: "flex-end",
                    width: "50%",
                  }}
                >
                  {props.map_info &&
                    props.map_info.map((m, index) => {
                      if (m === "T")
                        return (
                          <View
                            key={index}
                            style={{
                              width: `${mapWidth}%`,
                              backgroundColor: "green",
                              height: "3px",
                              flexGrow: "1",
                            }}
                          ></View>
                        );

                      if (m === "F")
                        return (
                          <View
                            key={index}
                            style={{
                              width: `${mapWidth}%`,
                              backgroundColor: "red",
                              height: "3px",
                              flexGrow: "1",
                            }}
                          ></View>
                        );

                      if (m === "N")
                        return (
                          <View
                            key={index}
                            style={{
                              width: `${mapWidth}%`,
                              backgroundColor: "black",
                              height: "3px",
                              flexGrow: "1",
                            }}
                          ></View>
                        );
                    })}
                </View>
              </View>

              {/* Generated  */}

              <View style={styles.infoRow}>
                <Text>Generated on </Text>

                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: "10px",
                  }}
                >
                  {new Date(props.created * 1000).toLocaleString()}
                </Text>
              </View>

              <Text
                style={{
                  fontSize: "8px",
                  textAlign: "center",
                  paddingVertical: "4px",
                  marginTop: "80px",
                }}
              >
                &copy; {new Date().getFullYear()} &nbsp;&nbsp;
                <Link
                  style={{
                    color: "skyblue",
                    textDecoration: "none",
                  }}
                  src={`${process.env.NEXT_PUBLIC_APP_URL}/portal`}
                >
                  HydraTest Web Application.
                </Link>
              </Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
}
