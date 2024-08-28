import React, { useState } from 'react';
import './faq.css';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [visibleCount, setVisibleCount] = useState(6);

  const faqData = [
    {
      question: ' सोलर लिथियम पावर वॉल कम हाइब्रिड इन्वर्टर क्या होता है?',
      answer: 'सोलर लिथियम पावर वॉल कम हाइब्रिड इन्वर्टर एक प्रकार का सौर ऊर्जा सम्पन्न इन्वर्टर है जो सौर पैनल से ऊर्जा को उठाकर उसे बैटरी में संचित करता है और विद्युतीय उपकरणों के लिए उपयोग करता है।',
    },
    {
      question: ' क्या सौर लिथियम पावर वॉल कम हाइब्रिड इन्वर्टर भारतीय बाजार में बन रहा है?',
      answer: 'हां, सौर लिथियम पावर वॉल कम हाइब्रिड इन्वर्टर भारतीय बाजार में उत्पादित हो रहा है।',
    },
    {
      question: ' क्या इस इन्वर्टर के सभी पार्ट्स भारत में मनुफैक्चर किए जाते हैं?',
      answer: 'जी हां, सौर लिथियम पावर वॉल कम हाइब्रिड इन्वर्टर के सभी पार्ट्स भारत में ही निर्मित किए जाते हैं।',
    },
    {
      question: ' क्या इस इन्वर्टर का उपयोग जीवनकालिक बैटरी के साथ किया जा सकता है?',
      answer: 'हां, सौर लिथियम पावर वॉल कम हाइब्रिड इन्वर्टर का उपयोग जीवनकालिक बैटरी के साथ किया जा सकता है जो इसे बहुत अधिक वक्त तक चलाने की क्षमता प्रदान करती है।',
    },
    {
      question: ' क्या इस इन्वर्टर द्वारा सेट किए गए सिस्टम में बैटरी की वारंटी होगी?',
      answer: 'हां, सौर लिथियम पावर वॉल कम हाइब्रिड इन्वर्टर के साथ उपयोग होने वाली बैटरी को 15 वर्षों की वारंटी दी जाती है।',
    },
    {
      question: ' क्या इस इन्वर्टर के माध्यम से शहरी बिजली का उपयोग किया जा सकता है?',
      answer: 'हां, सौर लिथियम पावर वॉल कम हाइब्रिड इन्वर्टर के माध्यम से शहरी बिजली का उपयोग किया जा सकता है। यह इन्वर्टर कम ऊर्जा खपत करता है और शहरी बिजली के उपयोग को कम करके उचित संकेत देता है।',
    },
    {
      question: ' क्या इसका उपयोग पर्यावरण को स्वस्थ बनाने में मदद करता है?',
      answer: 'हां, सौर लिथियम पावर वॉल कम हाइब्रिड इन्वर्टर का उपयोग पर्यावरण को स्वस्थ बनाने में मदद करता है क्योंकि इसे सौर ऊर्जा से चालित किया जाता है, जो प्रदूषण के निर्माण में कम योगदान करती है।',
    },
    {
      question: 'लीड एसिड सोलर इन्वर्टर्स और लिथियम सोलर हाइब्रिड इन्वर्टर में अंतर और फायदे:',
      answer: "लीड एसिड सोलर इन्वर्टर्स और लिथियम सोलर हाइब्रिड इन्वर्टर में अंतर और फायदे: 1. ऊर्जा प्रदान: लीड एसिड सोलर इन्वर्टर्स समान्यतः कम ऊर्जा प्रदान करते हैं और इसे सामान्य उपयोगों के लिए इस्तेमाल किया जा सकता है। वहीं, लिथियम सोलर हाइब्रिड इन्वर्टर्स में बेहतरीन ऊर्जा प्रदान की सुविधा होती है और वे मोबाइलिटी और पोर्टेबिलिटी के साथ इस्तेमाल किए जा सकते हैं। 2. लाइफस्पैन: लीड एसिड सोलर इन्वर्टर्स की आमतौर पर 2 से 5 वर्ष की उम्र होती है, जबकि लिथियम सोलर हाइब्रिड इन्वर्टर्स के आमतौर पर 10 से 35 वर्षों की ऊर्जा उत्पादकता की उम्र होती है। इसका मतलब है कि लिथियम इन्वर्टर्स में कम रखरखाव की जरूरत होती है और सालों तक चल सकते हैं, जबकि लीड एसिड इन्वर्टर्स में नियमित रूप से रखभाल की जरूरत होती है। 3. चार्जिंग कपेसिटी: लिथियम सोलर हाइब्रिड इन्वर्टर्स जल्दी चार्ज होते हैं और अधिक ऊर्जा संचित करते हैं, जिसके कारण उन्हें अधिक समय तक चलाया जा सकता है। लीड एसिड इन्वर्टर्स की चार्जिंग क्षमता कम होती है और अधिक समय की आवश्यकता होती है प्रारंभिक चार्जिंग के लिए। 4. वजन और आकार: लीड एसिड सोलर इन्वर्टर्स भारी होते हैं और अधिक जगह लेते हैं, जबकि लिथियम सोलर हाइब्रिड इन्वर्टर्स लाइटवेट होते हैं और कम जगह लेते हैं। इसलिए, लिथियम इन्वर्टर्स को संगठित करना आसान होता है और अधिक प्रशंसा प्राप्त करते हैं। 5. ईंधन की कीमत: लिथियम सोलर हाइब्रिड इन्वर्टर में यूनिट ऊर्जा प्राप्त करने के लिए कम यूनिट की आवश्यकता होती है, साथ ही, इसे इस्तेमाल करने के लिए नियमित तौर पर ज्यादा पैसे खर्च करने की जरूरत नहीं होती है। लीड एसिड सोलर इन्वर्टर्स में यूनिट की कीमत उच्च हो सकती है।",
    },
    {
      question: 'सोलर प्लांट लगाते समय इस बात का ध्यान रखना बहुत जरूरी है कि सोलर प्लांट की स्थापना और संचालन में किसी भी प्रकार की गलती ना होने पर. कुछ महत्वपूर्ण विचार निम्नानुसार हैं:',
      answer: "1. स्थान: सोलर प्लांट के लिए स्थान का चयन बहुत महत्वपूर्ण है। यह ध्यान में रखा जाना चाहिए कि स्थान खुला होना चाहिए जिससे कि समय-समय पर धूप मिल सके। प्लांट की डायरेक्शन साउथ होनी चाहिए। पैनल को स्ट्रक्चर के ऊपर लगाया जाता है जिसको हर अलग जगह के हिसाब से अलग अलग एंगल्स पर रखा जाता है । साथ ही, स्थान समृद्ध जल आपूर्ति के करीब होना चाहिए जहां से पाइपलाइन से जल सप्लाई की जा सकती है।अगर उनको डेली साफ रखने की व्यवस्था की गई हो। 2. तकनीकी जांच: सोलर प्लांट लगाते समय, संभवतः इंजीनियरिंग कंपनियों ने सारे तकनीकी मापदंडों को पूरा करने के लिए विशेषज्ञों को भेजा जाता है, जो निम्नलिखित चीजों की जांच करते हैं: - एरीयल फोटोग्राफी - जोनिंग की जांच - मिट्टी की जांच और ढलान - प्रतिरोध दल की जांच - परिसर जांच – लोड टाइप एयर कंडीशनर की संख्या, बल्बों की संख्या, पंखों की संख्या, सबमर्सिबल की संख्या ,फ्रिज इत्यादि। इनको तीन पार्ट्स में डिवाइड किया जाता है 3. संचालन प्रणाली: सोलर प्लांट लगाते समय, संचालन प्रणाली टेक्नोलॉजी का भी सही चयन करने की जरूरत होती है, जिसमें फोटोवोल्टेक विद्युत उत्पादन तकनीक जैसे पॉली या मोनो perc , या सोलर मोनो हाफ कट या bifacial सोलर पैनल प्रचलित है, इनवर्टर टेक्नोलॉजी, बैटरी लेवल एवं सोलर-विंड हाइब्रिड सिस्टम जैसी तकनीक सम्मिलित की जानी चाहिए. 4. विद्युत डिस्ट्रीब्यूशन: सोलर प्लांट को शुरू करने से पहले, बिजली डिस्ट्रीब्यूशन को अच्छी तरह से विचार और कनेक्ट किया जाना चाहिए ताकि सौर ऊर्जा को शेष बिजली सेवाओं से भेजा जा सके। 5. उपकरणों का चयन: स्पेसिफिक उपकरणों का अच्छा चयन सोलर प्लांट के लिए बहुत जरूरी होता है। सही उपकरण चयन करने से भी सोलर प्लांट का उत्पादन बढ़ाया जा सकता है। केसे सही डायरेक्शन, सही वायर क्वॉलिटी इन mm, प्रॉपर insultaion , जंक्शन बॉक्स इत्यादि। इन सभी बातों का ध्यान रखते हुए, सोलर प्लांट लगाते समय किसी भी प्रकार की गलती से बचे और हमारे मोसेता moseta के बने उत्पाद को ही इस्तेमाल करें।",
    },
    {
      question: 'सोलर प्लांट लगाने से पहले घर के लोड को कैसे कैलकुलेट करें, यह विषय महत्वपूर्ण है। इसके लिए निम्नलिखित चरणों का पालन करें:      ',
      answer: '1. उपयोगकर्ता के लिए उपयोगी इलेक्ट्रिकल उपकरणों की सूची तैयार करें: पहले से ही मुख्यतः उपयोगी इलेक्ट्रिकल उपकरणों की सूची बनाएं, जैसे कि एसी, रेफ्रिजरेटर, टीवी, लैपटॉप, घर के रोशनी के लिए बलब, पंखे, वॉशिंग मशीन, व्यायाम मशीन, इत्यादि। 2. उपयोगकर्ता प्रतिदिन उपयोगिता इकाइयों का आकलन करें: अपने इलेक्ट्रिकल उपकरणों की सूची की मदद से, एक्सपर्ट या सोलर इंस्टालेशन के विशेषज्ञ की मदद से प्रतिदिन कितनी विद्युत उपयोगिता इकाइयों (इंडियन निर्देशिका: किलोवॉट-घंटा) की आवश्यकता होगी, उसका आकलन करें। जैसे फैन fan लेता है 100watt or उसको 24 hour चलाना है तो हुआ 24 x 100watt= 2400 watt तो हमे 2400 watt के जेनरेट करने वाले प्लांट की अवयश्कता होगी। सबमर्सिबल ,एयर कंडीशनर के केस में पावर थ्री टाइम्स ज्यादा कैलकुलेट करनी चाहिए। 3. उपयोगकर्ता का अधिकतम उपयोगिता इकाई के वक्त का आकलन करें। 4. उपयोगकर्ता के लिए सोलर प्लांट का आकार निर्धारित करें: उपयोगकर्ता की विद्युत उपयोगिता इकाई की आधार पर, सोलर प्लांट का आकार (किलोवॉट) निर्धारित करें। 5. उपयोगकर्ता के लिए बैटरी की आवश्यकता का आकलन करें: यदि उपयोगकर्ता बैटरी संग्रहण करने की आवश्यकता रखते हैं, तो उनकी प्रतिदिन की आवश्यकता के आधार पर बैटरी की क्षमता (अम्पीयर-घंटा) निर्धारित करें। 6. निस्संदेह सौर प्लांट के लिए अन्य घन्टा की जरूरतों का ध्यान रखें, जैसे बैटरी प्रतीक्षा क्षमता, इन्वर्टर क्षमता, यूपीएस क्षमता, आदि। मार्केट के एक किलोवाट सोलर प्लांट से 4.5 - 5unit per day तक जेनरेट किया जा सकता हे। पूरी साल में 310दिन। सर्दी,फॉग ,बारिश के वक्त रेडिएशन कम या ना होने की बज से सोलर बिजली नही बनता है। उपरोक्त चरणों के पालन करके आप सोलर प्लांट के लिए अपने घर के लोड को सही ढंग से कैलकुलेट कर सकते हैं। यह आपको एक सही और प्रभावी सोलर सिस्टम खरीदने में मदद करेगा।',
    },
    {
      question: ' What is a solar inverter?',
      answer: 'A solar inverter is a device that converts the direct current (DC) generated by solar panels into alternating current (AC), which is suitable for powering household appliances and feeding electricity back into the grid.',
    },
    {
      question: ' Why do I need a solar inverter?',
      answer: 'A solar inverter is necessary because most of our electrical appliances and equipment run on AC power, whereas solar panels generate DC power. The inverter ensures that the electricity produced by the solar panels can be used in our homes or fed into the grid.',
    },
    {
      question: 'What are the types of inverters available?',
      answer: 'There are different types of inverters, including solar inverters, On grid inverters, hybrid inverters and lithium hybrid inverters are commonly used and connect multiple solar panels together. Hybrid lithium inverters combine solar power with lithium battery storage, allowing you to use solar energy even during non-sunlight hours.',
    },
    {
      question: 'How do I choose the right solar inverter for my system?',
      answer: 'The selection of a solar inverter depends on factors such as the size of your solar system, the type of panels you have, your electricity usage patterns, and whether you want to incorporate battery storage. It is recommended to consult a solar professional to assess your specific needs and recommend the most suitable inverter.',
    },
    {
      question: 'Can I install a solar inverter myself ?',
      answer: 'While it is possible for some individuals with electrical expertise to install a solar inverter themselves, it is strongly recommended to hire a certified professional. A professional installer will ensure the system is wired correctly, meets safety standards, and maximizes its efficiency and performance.',
    },
    {
      question: 'How long does a solar inverter last ?',
      answer: "The lifespan of a market solar inverter can vary, but on average, it can last between 1 and 5 years. Regular maintenance and proper care can help extend its lifespan. But our Lithium hybrid range provide 15 year warranties, so it's important to check the warranty period and coverage when purchasing an inverter.",
    },
    {
      question: 'Are there any maintenance requirements for solar inverters?',
      answer: "Solar inverters generally require minimal maintenance. However, it is recommended to have your system inspected annually by a professional to ensure optimal performance. Additionally, monitoring the inverter's performance through its monitoring system can help identify any issues or irregularities early on.",
    },
    {
      question: 'Can a solar inverter work during a power outage?',
      answer: 'Standard grid-tied solar inverters are designed to automatically shut down during a power outage. This measure is taken to protect utility workers from potential electrical hazards. However, if you have a hybrid inverter with battery storage, it can continue to power your home when the grid is down.',
    },
    {
      question: 'How can I monitor the performance of my solar inverter?',
      answer: "Most solar inverters come with built-in monitoring systems or can be connected to external monitoring devices. These monitoring systems allow you to track the energy production of your solar panels, check for any errors or issues, and monitor your energy consumption.",
    },
    {
      question: 'Can I expand my solar system in the future without changing the inverter?',
      answer: "The ability to expand your solar system without changing the inverter depends on the type of inverter you have. String inverters may require adjustments or replacements if you wish to expand the system significantly. Hybrid inverters offer better flexibility for system expansion as they can easily accommodate additional panels or battery storage.",
    },

  ];

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const loadMore = () => {
    setVisibleCount((prevCount) => prevCount + 6);
  };

  return (
    <div className="faq">
      <div className="faq-header">
        <h2>Frequently Asked Questions</h2>
      </div>
      <div className="faq-list">
        {faqData.slice(0, visibleCount).map((item, index) => (
          <div
            key={index}
            className={`faq-item ${activeIndex === index ? 'active' : ''}`}
            onClick={() => toggleAccordion(index)}
          >
            <div className="faq-question">
              <h3>{item.question}</h3>
              <span className="toggle-icon">{activeIndex === index ? '-' : '+'}</span>
            </div>
            <div className={`faq-answer ${activeIndex === index ? 'open' : ''}`}>
              <div className="faq-answer-content">{item.answer}</div>
            </div>
          </div>
        ))}
      </div>
      {visibleCount < faqData.length && (
        <div className="faq-more">
          <div className="blur-effect"></div>
          <button onClick={loadMore}>More</button>
        </div>
      )}
    </div>
  );
};

export default FAQ;
