package com.interest.bbs.mq;

import com.interest.common.model.Request.MsgRecodeRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.stream.annotation.EnableBinding;
import org.springframework.messaging.support.MessageBuilder;

/**
 * @author: DaiJun
 * @date: 2019.11.22
 * @description:
 */
@Slf4j
@EnableBinding(InterestSource.class)
public class InterestSourceProducer {

    @Autowired
    private InterestSource interestSource;

    public void sendMsg(MsgRecodeRequest msg){
        log.info("send data by MQ | " + InterestSource.MESSAGE_OUTPUT + " | params: {}", msg);
        interestSource.messageOutput().send(MessageBuilder.withPayload(msg).build());
    }
}
