var ttsLayoutbuilder = null;
ttsLayoutbuilder = {
    panel: null,
    layoutpart_cnt: 0,
    parts: [],
    layoutpart: function(type, name){
        this.part = name;
        this.type = type;
        this.lefttop = 0;
        this.id = ttsLayoutbuilder.layoutpart_cnt;
        this.ttsdomelement = document.createElement("div");
        this.ttsdomelement.innerHTML = "<h5>" + type + ": " + name + "</h5>";
        this.ttsdomelement.className += type + " active ttsLpart";
        this.ttsdomelement.setAttribute("data-id", this.id);
        this.ttsdomelement.addEventListener("click", function (event) {
            
            event.stopPropagation();
            
            if (jQuery(event.target).hasClass("ttsLpart"))
                if (!jQuery(event.target).hasClass("active")) {
                    jQuery(".active").removeClass("active");
                    jQuery(event.target).addClass("active");
                }
                else {
                    jQuery(event.target).removeClass("active");
                }
        });
        this.ttsdomelement.addEventListener("mouseover", function (event) {
            
            event.stopPropagation();

            jQuery(".hovered").removeClass("hovered");
            jQuery(event.target).addClass("hovered");
        });
        this.ttsdomelement.addEventListener("mouseleave", function (event) {
            
            event.stopPropagation();

            jQuery(event.target).removeClass("hovered");
        });
        ttsLayoutbuilder.parts.push(this);
        ttsLayoutbuilder.layoutpart_cnt = ttsLayoutbuilder.parts.length;
        console.log(ttsLayoutbuilder.parts);
        
    },
    getIndex:function(id){
        for(var i = 0; i < ttsLayoutbuilder.parts.length;i++){
            var elem = ttsLayoutbuilder.parts[i],hit;
            if(elem.id === id){
                hit = i;
            }
        }
        return hit;
    },
    init: function () {
        ttsLayoutbuilder.panel = jQuery(".ttsLayoutbuilder-editor");
        jQuery(".ttsLayoutbuilder-controlwrapper").append("\
            <div id='ttsLayoutbuilder-colbox' class='ui-widget-content ttsLayoutbuilder-box'>\n\
                <div class='container-fluid'>\n\
                    <label for='Name'>Column Name</label>\n\
                    <input id='colpartname' name='Name' type='text'/>\n\
                    <h4>Choose Size</h4>\n\
                    <div class='row'>\n\
                        <div class='coldemo col-xs-1' data-size='1'>1</div>\n\
                    </div>\n\
                    <div class='row'>\n\
                        <div class='coldemo col-xs-2' data-size='2'>2</div>\n\
                    </div>\n\
                    <div class='row'>\n\
                        <div class='coldemo col-xs-3' data-size='3'>3</div>\n\
                    </div>\n\
                    <div class='row'>\n\
                        <div class='coldemo col-xs-4' data-size='4'>4</div>\n\
                    </div>\n\
                    <div class='row'>\n\
                        <div class='coldemo col-xs-5' data-size='5'>5</div>\n\
                    </div>\n\
                    <div class='row'>\n\
                        <div class='coldemo col-xs-6' data-size='6'>6</div>\n\
                    </div>\n\
                    <div class='row'>\n\
                        <div class='coldemo col-xs-7' data-size='7'>7</div>\n\
                    </div>\n\
                    <div class='row'>\n\
                        <div class='coldemo col-xs-8' data-size='8'>8</div>\n\
                    </div>\n\
                    <div class='row'>\n\
                        <div class='coldemo col-xs-9' data-size='9'>9</div>\n\
                    </div>\n\
                    <div class='row'>\n\
                        <div class='coldemo col-xs-10' data-size='10'>10</div>\n\
                    </div>\n\
                    <div class='row'>\n\
                        <div class='coldemo col-xs-11' data-size='11'>11</div>\n\
                    </div>\n\
                    <div class='row'>\n\
                        <div class='coldemo col-xs-12' data-size='12'>12</div>\n\
                    </div>\n\
                    <div class='ttsLayoutbuilder-boxclose'><a>close</a></div>\n\
                </div>\n\
            </div>"
                );
        jQuery('#ttsLayoutbuilder-colbox').hide();
        jQuery(".ttsLayoutbuilder-controlwrapper").append("\
            <div id='ttsLayoutbuilder-contbox' class='ui-widget-content ttsLayoutbuilder-box'>\n\
                <div class='container-fluid'>\n\
                    <label for='Name'>Container Name</label>\n\
                    <input id='contpartname' name='Name' type='text'/>\n\
                    <h4>Choose Type</h4>\n\
                    <div class='row'>\n\
                        <div class='contdemo col-xs-12'data-size=''>fixed width</div>\n\
                    </div>\n\
                    <div class='row'>\n\
                        <div class='contdemo col-xs-12' data-size='-fluid'>full width</div>\n\
                    </div>\n\
                    <div class='ttsLayoutbuilder-boxclose'><a>close</a></div>\n\
                </div>\n\
            </div>"
                );
        jQuery('#ttsLayoutbuilder-contbox').hide();
        jQuery(".ttsLayoutbuilder-controlwrapper").append("\
            <div id='ttsLayoutbuilder-rowbox' class='ui-widget-content ttsLayoutbuilder-box'>\n\
                <div class='container-fluid'>\n\
                    <label for='Name'>Row Name</label>\n\
                    <input id='rowpartname' name='Name' type='text'/>\n\
                    <div class='row'>\n\
                        <div class='rowdemo col-xs-12'data-size=''>add row</div>\n\
                    </div>\n\
                    <div class='ttsLayoutbuilder-boxclose'><a>close</a></div>\n\
                </div>\n\
            </div>"
                );
        jQuery('#ttsLayoutbuilder-rowbox').hide();
        
        jQuery('.tts-del').on('click', function () {
            if(jQuery(".active").hasClass("ttsLpart")){
                var index = ttsLayoutbuilder.getIndex(jQuery(".active").data("id"));
                ttsLayoutbuilder.parts.splice(index,1);
                jQuery(".active").remove();
            }
            else
                alert("Base container is fixed");
            
        });
        jQuery(".ttsLayoutbuilder-toggleElement").on("click", function (event) {
            if (jQuery(".active").length > 0) {
                event.stopPropagation();
                if (jQuery(event.target).hasClass("tts-new-container")) {
                    ttsLayoutbuilder.addcont(event);
                }
                if (jQuery(event.target).hasClass("tts-new-row")) {
                    ttsLayoutbuilder.addrow(event);
                }
                if (jQuery(event.target).hasClass("tts-new-column")) {
                    ttsLayoutbuilder.addcol(event);
                }
            } else {
                if (!(jQuery(".ttsLayoutbuilder-editor").children().length > 0))
                    jQuery(".ttsLayoutbuilder-editor").addClass('active');
            }

        });
    },
    updateContainerInfo: function () {
    },
    addrow: function (event) {
        jQuery("#ttsLayoutbuilder-rowbox").show("fast").animate({left:event.clientX,top:event.clientY-100},"fast");
        
        jQuery("#ttsLayoutbuilder-rowbox").draggable();
        jQuery(".rowdemo").unbind("click");
        jQuery(".rowdemo").on('click', function (event) {
            
            event.stopPropagation();

            var lay = new ttsLayoutbuilder.layoutpart("row", document.getElementById('rowpartname').value);
            jQuery(".active").append(lay.ttsdomelement).removeClass("active");
            jQuery("#ttsLayoutbuilder-rowbox").hide("fast");
        });
        jQuery('.ttsLayoutbuilder-boxclose').on("click", function (event) {
            jQuery(event.target).parents(".ttsLayoutbuilder-box").hide("fast");
        });
    },
    addcol: function (event) {
        jQuery("#ttsLayoutbuilder-colbox").show("fast").animate({left:event.clientX,top:event.clientY-100},"fast");
        jQuery("#ttsLayoutbuilder-colbox").draggable();
        jQuery(".coldemo").unbind("click");
        jQuery(".coldemo").on('click', function (event) {
            event.stopPropagation();
            var lay = new ttsLayoutbuilder.layoutpart("col-xs-" + jQuery(event.target).data("size"), document.getElementById('colpartname').value);
            jQuery(".active").append(lay.ttsdomelement).removeClass("active");
            jQuery("#ttsLayoutbuilder-colbox").hide("fast");
        });
        jQuery('.ttsLayoutbuilder-boxclose').on("click", function (event) {
            jQuery(event.target).parents(".ttsLayoutbuilder-box").hide("fast");
        });
    },
    addcont: function (event) {
        jQuery("#ttsLayoutbuilder-contbox").show("fast").animate({left:event.clientX,top:event.clientY-100},"fast");
        jQuery("#ttsLayoutbuilder-contbox").draggable();
        jQuery(".contdemo").unbind("click");
        jQuery(".contdemo").on('click', function (event) {
            event.stopPropagation();
            var lay = new ttsLayoutbuilder.layoutpart("container" + jQuery(event.target).data("size"), document.getElementById('contpartname').value);
            jQuery(".active").append(lay.ttsdomelement).removeClass("active");
            jQuery("#ttsLayoutbuilder-contbox").hide("fast");
        });
        jQuery('.ttsLayoutbuilder-boxclose').on("click", function (event) {
            jQuery(event.target).parents(".ttsLayoutbuilder-box").hide("fast");
        });
    }
};
jQuery(document).ready(function () {
    ttsLayoutbuilder.init();
});
