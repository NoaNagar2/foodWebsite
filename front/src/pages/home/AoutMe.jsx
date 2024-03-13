import React, { useState } from "react";
import { Box } from "@mui/material";
import TypographyAnimation from "./TypographyAnimation";

const AoutMe = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isVisible2, setIsVisible2] = useState(false);
  const [isVisible3, setIsVisible3] = useState(false);
  const [isVisible4, setIsVisible4] = useState(false);

  setTimeout(() => {
    setIsVisible(true);
  }, [0]);
  setTimeout(() => {
    setIsVisible2(true);
  }, [1000]);
  setTimeout(() => {
    setIsVisible3(true);
  }, [2000]);
  setTimeout(() => {
    setIsVisible4(true);
  }, [3000]);

  return (
    <Box>
      <TypographyAnimation
        show={isVisible}
        text="שלום לכולם ואיזה כייף שאתם כאן"
      />
      <TypographyAnimation
        show={isVisible}
        text="שמי שנהב בנימין ירוחם , נשואה ואמא לשלושה ממתקים,"
      />
      <TypographyAnimation
        show={isVisible}
        text="חיה, נושמת חולמת ומחוברת לאוכל, תזונה ומתכונים."
      />
      <TypographyAnimation
        show={isVisible2}
        text="אוכל עבורי הוא שפה של אהבה, נתינה , הענקה, בית חם , אירוח וחום"
      />
      <TypographyAnimation
        show={isVisible2}
        text="אוכל הוא כלי שברגע שיודעים להשתמש בו בחוכמה הוא הופך להנאת והנעת
          החיים!"
      />
      <TypographyAnimation
        show={isVisible2}
        text="יש בי משיכה וחיבור לכל מה שמגיע מהטבע ,כל מה שהיה מחובר לאדמה והגיע
          לצלחת שלנו, ירקות, פירות, קטניות , דגנים,"
      />
      <TypographyAnimation
        show={isVisible2}
        text="במקביל מטורפת על מאפים, עגות, לחמים, עוגית וכל סוגי הבצקים ,התנור דולק
          אצלי בבית באופן קבוע ."
      />
      <TypographyAnimation
        show={isVisible3}
        text=" מזמינה אתכם להנות מאתר שכולו אוכל חגיגי, יפה , מרשים , מזין וטעים
          בטירוף,"
      />
      <TypographyAnimation
        show={isVisible3}
        text=" המטרה העיקרית שלי הוא לחבר אתכם למטבח , לבשל ממקום של אהבה ונתינה"
      />
      <TypographyAnimation
        show={isVisible3}
        text=" ובעיקר להראות שלא חייב להיות שף גדול או קונדיטור מדופלם כדיי להכין
          אוכל שמשגע את העין והחך."
      />
      <TypographyAnimation
        show={isVisible3}
        text=" והכי חשוב לחיות באיזון והרמוניה עם כל הטוב והשפע שמגיע לצלחת שלנו."
      />
      <TypographyAnimation
        show={isVisible4}
        text="בנוסף ליצירת תוכן קולינרי ומתכונים אני מקיימת מגוון סדנאות אפייה
          ואירוח בביתי ומזמינה את כולכם להגיע ."
      />
    </Box>
  );
};

export default AoutMe;
