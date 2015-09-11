# resource2

## ウォッチ対象のserverへnode.jsをインストール
```
#cd /usr/local/src
#tar xvzf node-v0.8.9.tar.gz
#cd node-v0.8.9
#./configure
#make
#make install
#node -v
```

## ディレクトリへ設置
/home/node へ一式を展開(ディレクトリは任意の位置で構わない)
```
/home/node/resource2.js
/home/node/node_modules
```


## /etc/init.d/resource2を設置してdaemonで起動する。
### サンプル

```
#!/bin/bash
#
# resource2.js        Startup script for the websocket Server
#
# chkconfig: - 85 15
# description: node.js resource.js startupscript  \
#
# processname: resource2
# pidfile: /var/run/resource2/resource2.pid
#
### BEGIN INIT INFO
# Provides: resource2.js
### END INIT INFO

# Path to the apachectl script, server binary, and short-form for messages.
node=/usr/local/bin/node
prog=resource2
pidfile=${PIDFILE-/var/run/resource2/resource2.pid}
lockfile=${LOCKFILE-/var/lock/subsys/resource2}
RETVAL=0
STOP_TIMEOUT=${STOP_TIMEOUT-10}

start() {
        echo -n $"Starting $prog: "
        $node /home/node/resource2.js &
        RETVAL=$?
        echo
        [ $RETVAL = 0 ] && touch ${lockfile}
        return $RETVAL
}

stop() {
        echo -n $"Stopping $prog: "
        pkill -f "$node /home/node/resource2.js"
        RETVAL=$?
        echo
        [ $RETVAL = 0 ] && rm -f ${lockfile} ${pidfile}
}

case "$1" in
  start)
        start
        ;;
  stop)
        stop
        ;;
  *)
        echo $"Usage: $prog {start|stop}"
        RETVAL=2
esac

exit $RETVAL
```
## chkconfig resource2 on

## service resource2 start



