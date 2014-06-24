//Notifications
var PageTitleNotification = 
    {   Vars: 
            { OriginalTitle: document.title
            , Interval: null 
            }
    ,   On: function (e, time) { 
                var self = this
                ,   time = time || 1e3
                ,   titleSetter = function(e) {
                        document.title = self.Vars.OriginalTitle == document.title ? e : self.Vars.OriginalTitle;
                    }
                ;

                self.Vars.Interval = setInterval(titleSetter(e)) 
        }
    ,   Off: function () { 
            clearInterval(this.Vars.Interval); 
            document.title = this.Vars.OriginalTitle 
        } 
    }

function checkMessages() {
    if (!document.hasFocus() && window.newMessages > 0) {
        PageTitleNotification.On("(" + window.newMessages + ") New Chat Message(s)!");
    } else { 
        PageTitleNotification.Off(); 
        window.newMessages = 0
    }
};

window.newMessages = 0;
setInterval(checkMessages, 1000);
