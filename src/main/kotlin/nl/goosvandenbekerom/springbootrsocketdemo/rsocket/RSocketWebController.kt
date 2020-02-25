package nl.goosvandenbekerom.springbootrsocketdemo.rsocket

import kotlinx.coroutines.flow.*
import org.springframework.boot.autoconfigure.rsocket.*
import org.springframework.http.*
import org.springframework.messaging.rsocket.*
import org.springframework.web.bind.annotation.*

/**
 * This is an example of a kotlin coroutine based RSocket client
 * This exposes a stream over http on http://localhost:8080/numbers
 */
@RestController
class RSocketWebController(private val config: RSocketConfig,
                           private val strategies: RSocketStrategies,
                           private val properties: RSocketProperties) {

    suspend fun rSocketRequester() = RSocketRequester.builder()
            .rsocketStrategies(strategies)
            .connectWebSocketAndAwait(config.getUri(properties))

    @GetMapping("/numbers", produces = [MediaType.TEXT_EVENT_STREAM_VALUE])
    suspend fun getNumbersStreamViaSocket(): Flow<Int>
            = rSocketRequester().route("randomNumbers").retrieveFlow()
}
