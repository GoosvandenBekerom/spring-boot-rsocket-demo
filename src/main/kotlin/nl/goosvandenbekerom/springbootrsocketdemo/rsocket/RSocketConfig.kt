package nl.goosvandenbekerom.springbootrsocketdemo.rsocket

import org.springframework.boot.autoconfigure.rsocket.*
import org.springframework.boot.web.server.*
import org.springframework.context.annotation.*
import java.net.*

@Configuration
class RSocketConfig {

    @LocalServerPort
    private var port: Int? = null

    fun getUri(properties: RSocketProperties)
            = URI.create("ws://localhost:$port${properties.server.mappingPath}")
}
