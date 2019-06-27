<template>
  <div class="loader-box">
    <content-loader class="svg-box" :width='375' :height='660' v-if="showSkeleton=='1'">
      <rect x="16" y="25" rx="0" ry="0" width="97" height="24" />
      <rect x="323" y="25" rx="0" ry="0" width="36" height="24"/>
      <rect x="16" y="64" rx="0" ry="0" width="343" height="101"/>
      <rect x="16" y="190" rx="0" ry="0" width="343" height="80"/>
      <rect x="16" y="311" rx="0" ry="0" width="84" height="24"/>
      <rect x="293" y="311" rx="0" ry="0" width="66" height="24"/>

      <rect x="16" y="353" rx="0" ry="0" width="121" height="92"/>
      <rect x="149" y="353" rx="0" ry="0" width="126" height="24"/>
      <rect x="304" y="353" rx="15" ry="15" width="55" height="29"/>
      <rect x="149" y="382" rx="0" ry="0" width="89" height="16"/>
      <rect x="149" y="403" rx="0" ry="0" width="98" height="16"/>
      <rect x="149" y="427" rx="0" ry="0" width="159" height="16"/>
      <rect x="149" y="353" rx="0" ry="0" width="126" height="24"/>

      <rect x="16" y="479" rx="0" ry="0" width="121" height="92"/>
      <rect x="149" y="479" rx="0" ry="0" width="126" height="24"/>
      <rect x="304" y="479" rx="15" ry="15" width="55" height="29"/>
      <rect x="149" y="508" rx="0" ry="0" width="89" height="16"/>
      <rect x="149" y="529" rx="0" ry="0" width="98" height="16"/>
      <rect x="149" y="550" rx="0" ry="0" width="159" height="16"/>

      <rect x="16" y="604" rx="0" ry="0" width="121" height="92"/>
      <rect x="149" y="604" rx="0" ry="0" width="126" height="24"/>
      <rect x="304" y="604" rx="15" ry="15" width="55" height="29"/>
      <rect x="149" y="633" rx="0" ry="0" width="89" height="16"/>
      <rect x="149" y="654" rx="0" ry="0" width="98" height="16"/>
      <rect x="149" y="675" rx="0" ry="0" width="159" height="16"/>
    </content-loader>
    <content-loader class="svg-box" :width='375' :height='660' v-if="showSkeleton=='2'">
      <rect x="16" y="15" rx="0" ry="0" width="343" height="28" />
      <circle cx="47" cy="96" r="22" />
      <circle cx="143" cy="96" r="22" />
      <circle cx="235" cy="96" r="22" />
      <circle cx="328" cy="96" r="22" />
      <rect x="27" y="125" rx="0" ry="0" width="39" height="9" />
      <rect x="121" y="125" rx="0" ry="0" width="39" height="9" />
      <rect x="215" y="125" rx="0" ry="0" width="39" height="9" />
      <rect x="309" y="125" rx="0" ry="0" width="39" height="9" />
      <rect x="16" y="177" rx="0" ry="0" width="97" height="28" />

      <rect x="16" y="226" rx="0" ry="0" width="121" height="92"/>
      <rect x="149" y="226" rx="0" ry="0" width="126" height="24"/>
      <rect x="304" y="226" rx="15" ry="15" width="55" height="29"/>
      <rect x="149" y="254" rx="0" ry="0" width="89" height="16"/>
      <rect x="149" y="275" rx="0" ry="0" width="98" height="16"/>
      <rect x="149" y="296" rx="0" ry="0" width="159" height="16"/>

      <rect x="16" y="351" rx="0" ry="0" width="121" height="92"/>
      <rect x="149" y="351" rx="0" ry="0" width="126" height="24"/>
      <rect x="304" y="351" rx="15" ry="15" width="55" height="29"/>
      <rect x="149" y="380" rx="0" ry="0" width="89" height="16"/>
      <rect x="149" y="401" rx="0" ry="0" width="98" height="16"/>
      <rect x="149" y="422" rx="0" ry="0" width="159" height="16"/>

      <rect x="16" y="476" rx="0" ry="0" width="121" height="92"/>
      <rect x="149" y="476" rx="0" ry="0" width="126" height="24"/>
      <rect x="304" y="476" rx="15" ry="15" width="55" height="29"/>
      <rect x="149" y="505" rx="0" ry="0" width="89" height="16"/>
      <rect x="149" y="526" rx="0" ry="0" width="98" height="16"/>
      <rect x="149" y="547" rx="0" ry="0" width="159" height="16"/>

      <rect x="16" y="601" rx="0" ry="0" width="121" height="92"/>
      <rect x="149" y="601" rx="0" ry="0" width="126" height="24"/>
      <rect x="304" y="601" rx="15" ry="15" width="55" height="29"/>
      <rect x="149" y="630" rx="0" ry="0" width="89" height="16"/>
      <rect x="149" y="651" rx="0" ry="0" width="98" height="16"/>
      <rect x="149" y="672" rx="0" ry="0" width="159" height="16"/>

    </content-loader>
    <content-loader class="svg-box" :width='375' :height='660' v-if="showSkeleton=='3'">
      <rect x="16" y="15" rx="0" ry="0" width="50" height="28" />
      <rect x="86" y="24" rx="0" ry="0" width="171" height="17" />
      <rect x="336" y="24" rx="0" ry="0" width="18" height="17" />

      <rect x="16" y="65" rx="0" ry="0" width="210" height="21" />
      <rect x="16" y="97" rx="0" ry="0" width="134" height="21" />
      <rect x="16" y="140" rx="0" ry="0" width="85" height="16" />
      <rect x="156" y="140" rx="0" ry="0" width="70" height="16" />
      <rect x="239" y="65" rx="0" ry="0" width="120" height="93" />

      <rect x="16" y="190" rx="0" ry="0" width="210" height="21" />
      <rect x="16" y="222" rx="0" ry="0" width="134" height="21" />
      <rect x="16" y="255" rx="0" ry="0" width="85" height="16" />
      <rect x="156" y="255" rx="0" ry="0" width="70" height="16" />
      <rect x="239" y="190" rx="0" ry="0" width="120" height="93" />

      <rect x="16" y="315" rx="0" ry="0" width="210" height="21" />
      <rect x="16" y="347" rx="0" ry="0" width="134" height="21" />
      <rect x="16" y="380" rx="0" ry="0" width="85" height="16" />
      <rect x="156" y="380" rx="0" ry="0" width="70" height="16" />
      <rect x="239" y="315" rx="0" ry="0" width="120" height="93" />

      <rect x="16" y="440" rx="0" ry="0" width="210" height="21" />
      <rect x="16" y="472" rx="0" ry="0" width="134" height="21" />
      <rect x="16" y="505" rx="0" ry="0" width="85" height="16" />
      <rect x="156" y="505" rx="0" ry="0" width="70" height="16" />
      <rect x="239" y="440" rx="0" ry="0" width="120" height="93" />
      
      <rect x="16" y="565" rx="0" ry="0" width="210" height="21" />
      <rect x="16" y="597" rx="0" ry="0" width="134" height="21" />
      <rect x="16" y="630" rx="0" ry="0" width="85" height="16" />
      <rect x="156" y="630" rx="0" ry="0" width="70" height="16" />
      <rect x="239" y="565" rx="0" ry="0" width="120" height="93" />
    </content-loader>
    <content-loader class="svg-box" :width='375' :height='660' v-if="showSkeleton=='4'">
      <rect x="0" y="0" rx="0" ry="0" width="375" height="281" />
      <rect x="16" y="298" rx="0" ry="0" width="173" height="27" />
      <rect x="16" y="333" rx="0" ry="0" width="113" height="20" />
      <rect x="16" y="365" rx="0" ry="0" width="153" height="20" />
      <rect x="269" y="364" rx="0" ry="0" width="90" height="20" />
      <rect x="16" y="397" rx="0" ry="0" width="113" height="20" />
      <rect x="16" y="429" rx="0" ry="0" width="253" height="20" />
      <rect x="16" y="460" rx="0" ry="0" width="343" height="20" />
      <rect x="16" y="492" rx="0" ry="0" width="343" height="20" />
      <rect x="16" y="537" rx="0" ry="0" width="97" height="28" />
      <rect x="312" y="544" rx="0" ry="0" width="47" height="15" />
      <rect x="16" y="583" rx="0" ry="0" width="164" height="20" />
      <rect x="192" y="583" rx="0" ry="0" width="164" height="20" />
      <rect x="16" y="615" rx="0" ry="0" width="343" height="20" />
      <rect x="16" y="647" rx="0" ry="0" width="343" height="20" />
    </content-loader>
    <content-loader class="svg-box" :width='375' :height='660' v-if="showSkeleton=='5'">
      <rect x="16" y="24" rx="0" ry="0" width="343" height="23" />
      <rect x="16" y="55" rx="0" ry="0" width="198" height="23" />
      <rect x="16" y="92" rx="0" ry="0" width="152" height="23" />
      <rect x="277" y="92" rx="0" ry="0" width="82" height="23" />
      <rect x="16" y="134" rx="0" ry="0" width="343" height="194" />
      <rect x="16" y="336" rx="0" ry="0" width="343" height="23" />
      <rect x="16" y="397" rx="0" ry="0" width="343" height="23" />
      <rect x="16" y="428" rx="0" ry="0" width="343" height="23" />
      <rect x="16" y="459" rx="0" ry="0" width="343" height="23" />
      <rect x="16" y="490" rx="0" ry="0" width="198" height="23" />
      <rect x="16" y="545" rx="0" ry="0" width="343" height="23" />
      <rect x="16" y="576" rx="0" ry="0" width="343" height="23" />
      <rect x="16" y="607" rx="0" ry="0" width="343" height="23" />
      <rect x="16" y="638" rx="0" ry="0" width="343" height="23" />
    </content-loader>
  </div>
</template>

<script>
import { ContentLoader } from 'vue-content-loader'
export default {
  props: {
    showSkeleton: {
      types: [String, Number],
      default: '1'
    }
  },
  components: {
    ContentLoader
  }
}
</script>

<style lang="less" scoped>
  .loader-box{
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: #fff;
    z-index: 99999;
    .svg-box{
      margin: auto;
    }
  }
</style>
