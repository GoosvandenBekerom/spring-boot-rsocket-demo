package nl.goosvandenbekerom.springbootrsocketdemo.rsocket

import kotlinx.coroutines.*
import kotlinx.coroutines.flow.*
import org.springframework.messaging.handler.annotation.*
import org.springframework.stereotype.*
import kotlin.random.*

@Controller
class RSocketController {

    @MessageMapping("randomNumbers")
    fun randomNumbers(): Flow<Int> = flow {
        while(true) {
            delay(500)
            emit(Random.nextInt(999999999) )
        }
    }

}
