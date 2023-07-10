import React, { useEffect, useState } from "react";
import { useFrontContext } from "../providers/frontContext";
import { Paragraph, Heading, Button } from "@frontapp/ui-kit";

function Tutorial() {
  const context = useFrontContext();
  const [companyStats, setCompanyStats] = useState({});
  const [latestMessageId, setLatestMessageId] = useState();

  const user =
    context.teammate && context.teammate.name ? context.teammate.name : "world";
  const recipient =
    context.conversation &&
    context.conversation.recipient &&
    context.conversation.recipient.handle
      ? context.conversation.recipient.handle
      : "there";
  const type =
    context.conversation &&
    context.conversation.recipient &&
    context.conversation.recipient.type
      ? context.conversation.recipient.type
      : "there";

  let url =
    "https://get.taketatt.com/FuXhEdA4E7lJHytImQa4MLxNh7m6qJDA39GMXEoawN1PY?user=" +
    user +
    "&recipient=" +
    recipient +
    "&usertype=" +
    type;

  // Watches the context and selected the latest message id from the available messages.
  useEffect(() => {
    context.listMessages().then((response) => {
      if (response.results.length > 0) {
        const latestMessageIndex = response.results.length - 1;
        setLatestMessageId(response.results[latestMessageIndex].id);
      } else {
        setLatestMessageId(undefined);
      }
    });
  }, [context]);

  useEffect(() => {
    // Pseudo-code for fetching data from an external API or database
    setCompanyStats({
      company: "Blue Rose Labs",
      accountNumber: 54968483,
      activeOrder: 8347,
      status: "Shipped",
      deliveryDate: "March 31st",
    });
  }, []);

  const onCreateDraftClick = () => {
    if (!latestMessageId) return;

    context.createDraft({
      content: {
        body: `Hello ${recipient}! Order ${companyStats.activeOrder} is ${companyStats.status} and expected to arrive on ${companyStats.deliveryDate}.`,
        type: "text",
      },
      replyOptions: {
        type: "replyAll",
        originalMessageId: latestMessageId,
      },
    });
  };

  return (
    <div className="App">
      <iframe
        class="studio-embed"
        title="drona"
        src={url}
        frameborder="0"
        width="100%"
        height="533"
      ></iframe>
    </div>
  );
}

export default Tutorial;
