import { useState } from 'react';

import Accordion from '@/components/common/Accordion';
import Button from '@/components/forms/Button';

import classes from './index.module.scss';

interface IQAItem {
  question: string;
  answer: string;
}

const QAItems: IQAItem[] = [
  {
    question: 'What photo quality is recommended when using Harmony?',
    answer: `Photo distortion: Being too close to your camera can warp your features and drastically alter your score, usually for the worse. A 26mm camera lens (minimum on most phones) should be fine assuming you stand back about 3-6 feet and use a self-timer. We generally caution against using selfies.
    The best camera lenses to ensure maximum accuracy are approximately 85mm. Zooming  into a mirror with your phone's back camera or using the self timer erases over 90% of lens distortion.
    Photo quality:  Blurry photos can lead to imprecise landmark placement which will throw off your score.
    Anything with normal to high resolution, as well as images that are not too small will be fine. 
    Head position: The positioning of your face will affect your score. Make sure your face is turned fully to the front and side for each respective profile. In other words, your front photo should not be turned slightly to the side. Your side profile should not be slightly turned to the front. Your front photo should be facing completely forward and your side photo should be facing completely to the side.
    Additionally, make sure your face is not tilted up or down. In other words, your face should not be pointed at the ceiling or the floor. Your head should be neutrally positioned.`,
  },
  {
    question: 'What does my Harmony score mean?',
    answer: `Your harmony score is a summary of how pleasantly positioned your features are relative to one another. Attractive faces have more mathematically normalized proportions, angles, and features; abnormal features usually signal unideal facial growth patterns.
    You can think of your harmony score as a rating of your face's baseline, or foundation. It is how attractive the blank canvas of your face is, including your  bone structure and soft tissue as well (e.g., lips).
    Your harmony score does not factor in things like your skin color, hair color, blemishes, or acne. Those features sit on top of your face’s baseline and they certainly do affect facial attractiveness. An example would be if you submitted a photo with long hair vs. short hair – your harmony score should be identical  if the photo is taken under the same conditions. However, you may look better with longer hair.
    Usually your harmony score will be tightly correlated to your overall facial attractiveness, but this may not always be the case. For example, if you have severe acne or lacking eyebrows, your perceived attractiveness may be lower than your harmony score.
    Your harmony score should closely follow a normal distribution of rarity. Getting above a 90% is exceedingly rare and most people lie between 35-65%. 100% represents the idealized standard of facial harmony.
    `,
  },
  {
    question: 'How will the information in the Harmony report help me?',
    answer: `Whether the information in the harmony report will be helpful or not is entirely dependent on the user. Harmony has application for recreational use, but also utility to direct your self-improvement journey.
    This information can also be helpful in a clinical setting. You can alter your features through Photoshop and compare the harmony score before and after to see if a given operation will yield an overall positive result to your appearance. Remember that changing one feature does not always affect your face in isolation; making your nose smaller can throw off your overall facial balance in ways you may not anticipate. This is where Harmony comes in.
    You can use the information in your report to help plan the best course of action for your facial cosmetic operation. Harmony is not intended as a replacement for consulting with a cosmetic surgeon. 
    `,
  },
  {
    question: 'How does Harmony work?',
    answer: `Harmony uses advanced machine learning algorithms to analyze your facial features and provide feedback on your attractiveness. It takes into account various factors such as symmetry, facial proportions, and skin condition.`,
  },
  {
    question: 'How accurate are the results?',
    answer: `While Harmony strives to provide accurate feedback, it's important to remember that beauty still has subjective components. The results should be taken as suggestions for improvement rather than definitive judgments. As we further improve our models and integrate other features, we hope to create a tool that can assess facial attractiveness as accurately as possible.`,
  },
  {
    question: 'Is my data secure?',
    answer: `Yes, Harmony takes data security seriously. All your personal information and facial images are encrypted and stored securely. We adhere to strict privacy policies to ensure the confidentiality of your data.`,
  },
];

function FAQs() {
  const [activeIndex, setActiveIndex] = useState(-1);

  const onAccordionClick = (id: number) => () => {
    if (id === activeIndex) setActiveIndex(-1);
    else setActiveIndex(id);
  };

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <h1>Frequently Asked Questions</h1>
        <p>
          Find answers to common questions about Harmony's facial attractiveness
          analysis tool.
        </p>
      </div>
      <div className={classes.container}>
        <div className={classes.content}>
          {QAItems.map((item: IQAItem, index: number) => (
            <Accordion
              key={index}
              active={index === activeIndex}
              header={item.question}
              body={item.answer}
              onClick={onAccordionClick(index)}
            />
          ))}
        </div>
        <div className={classes.contact}>
          <p className={classes.question}>Still have questions?</p>
          <p className={classes.statement}>
            Contact our support team for further assistance.
          </p>
          <Button variant="contained" color="success">
            Contact
          </Button>
        </div>
      </div>
    </div>
  );
}

export default FAQs;
