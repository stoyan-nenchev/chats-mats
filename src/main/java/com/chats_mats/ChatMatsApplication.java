package com.chats_mats;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@SpringBootApplication
@EnableTransactionManagement
public class ChatMatsApplication {

	public static void main(String[] args) {
		SpringApplication.run(ChatMatsApplication.class, args);
	}

}
