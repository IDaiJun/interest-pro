package com.interest.message.mq;

import com.interest.common.model.Request.MsgRecodeRequest;
import com.interest.message.model.entity.MsgRecordEntity;
import com.interest.message.service.MsgRecordsService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.stream.annotation.EnableBinding;
import org.springframework.cloud.stream.annotation.StreamListener;

/**
 * @author: DaiJun
 * @date: 2019.11.22
 * @description:
 */
@Slf4j
@EnableBinding(InterestSink.class)
public class InterestSinkConsumer {

    @Autowired
    private MsgRecordsService msgRecordsService;

    @StreamListener(InterestSink.MESSAGE_INPUT)
    public void messageReceive(MsgRecodeRequest msgRecodeRequest) {
        log.info("get data by MQ | " + InterestSink.MESSAGE_INPUT + " | params: {}", msgRecodeRequest);
        msgRecordsService.insertMessage(msgRecodeRequest);
    }
}
