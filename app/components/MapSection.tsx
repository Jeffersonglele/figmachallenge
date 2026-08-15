"use client";

import { useEffect, useMemo, useState } from "react";
import { Search, X, MapPin, Filter } from "lucide-react";

type Department = { id: string; name: string; d: string; labelX: number; labelY: number };
type City = { id: string; name: string; department: string; x: number; y: number };
type CenterType = "sts" | "pts";
type Center = {
    id: string;
    name: string;
    type: CenterType;
    cityId: string;
    address: string;
    hours?: string;
    donationTypes?: string[];
    appointment?: "libre" | "sur rendez-vous";
    contact: string;
};

const DEPARTMENTS: Department[] = [
    { id: "alibori", name: "Alibori", labelX: 210, labelY: 110, d: "M301.855,80.529L299.505,82.781L292.201,94.739L290.879,99.462L290.234,100.981L288.129,106.454L288.082,108.904L289.718,111.693L307.5,137.927L309.914,140.271L310.682,140.286L311.604,140.304L312.373,140.319L313.28,141.103L312.126,145.063L312.082,147.36L312.501,149.512L313.233,151.365L314.273,153.223L316.245,162.452L316.186,165.515L313.773,170.982L313.737,172.819L314.174,174.053L314.925,174.987L315.832,175.77L316.582,176.704L317.022,177.785L317.879,181.172L318.777,182.414L320.151,182.901L321.528,183.234L322.742,184.024L323.626,186.032L324.027,189.103L323.979,191.553L285.171,195.085L260.486,199.659L235.707,201.167L220.861,197.814L215.329,197.706L198.845,199.529L182.733,197.99L177.491,198.806L172.26,199.011L166.858,200.131L161.941,200.035L163.028,199.444L163.209,166.514L163.242,164.83L163.88,163.617L164.992,161.801L167.034,159.543L173.28,154.61L169.962,151.328L168.747,150.539L168.44,150.533L167.518,150.515L167.066,150.046L166.153,149.569L164.929,149.239L164.007,149.221L159.077,141.926L139.952,105.71L139.503,105.088L153.141,91.568L160.79,85.59L166.382,82.636L167.792,81.285L168.117,80.372L168.174,77.463L169.306,74.575L173.388,70.212L174.825,67.483L178.71,57.449L178.731,56.377L177.384,54.513L177.404,53.441L177.892,52.072L179.736,52.108L180.664,51.82L181.294,51.066L182.092,49.55L182.875,48.799L183.951,48.82L185.021,49.147L185.789,49.162L185.828,47.172L185.852,45.947L184.939,45.47L184.023,45.145L182.956,44.665L181.898,43.725L181.148,42.792L180.554,41.708L177.364,31.842L176.402,26.003L176.447,23.706L177.251,21.884L179.731,20.86L181.114,20.887L183.419,20.932L184.802,20.959L185.118,20.505L185.91,19.296L186.38,18.845L187.149,18.86L187.748,19.638L188.209,19.647L188.842,18.74L189.327,17.524L190.101,17.233L191.023,17.251L192.249,17.428L192.551,17.74L192.539,18.353L192.991,18.821L193.759,18.836L194.383,18.388L195.323,17.488L195.79,17.191L199.496,16.344L199.957,16.353L200.867,16.983L201.328,16.992L201.948,16.698L203.196,15.803L203.964,15.818L207.483,16.653L208.417,16.058L209.845,13.788L210.167,13.029L210.182,12.263L210.658,11.507L211.285,10.906L212.369,10.468L213.43,11.254L214.512,10.969L215.449,10.221L217.178,8.264L218.269,7.519L219.191,7.537L221.188,7.576L222.264,7.597L224.729,7.339L225.988,5.832L230.818,10.368L232.949,11.482L234.004,12.574L234.748,13.814L235.318,16.123L236.068,17.057L237.132,17.69L238.353,18.174L241.727,18.546L242.643,18.87L242.939,19.488L243.976,21.5L248.005,27.706L265.21,44.124L265.505,44.743L266.867,45.842L267.163,46.46L267.425,48.763L267.841,51.069L268.574,52.921L270.801,56.947L272.151,58.658L273.059,59.442L274.27,60.385L275.647,60.718L277.042,60.132L278.443,59.24L279.666,59.571L280.73,60.204L281.8,60.531L286.353,63.531L290.014,64.981L291.075,65.767L291.828,66.548L295.113,71.513L295.716,72.138L296.325,72.456L296.777,72.924L297.069,73.696L297.497,75.389L297.79,76.161L297.772,77.079L298.372,77.857L299.285,78.334L300.174,80.037L300.93,80.664L301.855,80.529Z" },
    { id: "borgou", name: "Borgou", labelX: 180, labelY: 280, d: "M324.287,191.559L324.224,194.775L323.402,197.516L320.689,202.671L319.713,205.409L319.608,210.768L318.801,212.744L317.226,214.704L315.683,214.981L309.141,211.483L306.996,211.135L304.986,211.709L302.949,213.66L302.317,214.567L301.998,215.173L301.959,217.164L301.474,218.38L298.784,222.31L296.54,227.015L296.501,229.005L297.993,231.332L304.768,238.663L305.666,239.906L305.94,241.597L305.597,243.428L305.585,244.04L304.465,246.316L303.218,247.211L301.666,247.947L300.1,249.448L299.452,251.12L298.664,259.989L297.55,261.959L294.091,265.874L291.23,270.719L289.353,272.368L283.218,271.635L279.202,272.629L271.766,275.548L270.052,276.74L269.091,278.712L268.739,281.003L269.008,283L270.174,286.239L270.88,289.47L270.058,292.211L266.641,293.982L264.797,293.946L262.809,293.448L261.109,293.874L260.29,296.462L260.275,297.228L260.863,298.618L260.854,299.077L254.396,307.07L253.615,307.667L251.913,308.247L251.133,308.844L249.072,312.021L248.555,314.921L249.112,317.842L250.279,321.082L250.554,322.772L250.422,329.509L249.766,331.641L247.537,335.58L243.95,346.079L242.351,349.265L239.859,350.901L232.908,352.604L231.679,352.58L230.612,352.099L229.702,351.469L228.636,350.988L227.56,350.967L224.487,350.908L223.411,350.887L222.317,351.784L221.377,352.685L220.44,353.433L219.057,353.406L211.229,352.794L211.483,355.556L211.355,362.14L210.532,364.881L210.213,365.487L209.105,367.151L208.797,367.145L208.93,368.219L209.391,368.228L209.843,368.697L210.289,369.471L210.259,371.003L208.82,373.885L208.482,375.41L208.465,376.329L209.049,377.872L209.031,378.791L208.405,379.391L206.7,380.124L206.07,380.877L206.049,381.949L152.124,380.285L153.117,376.628L152.515,376.004L152.207,375.998L151.602,375.526L141.516,372.419L139.537,371.462L138.627,370.831L137.87,370.204L137.117,369.423L136.517,368.646L136.225,367.874L135.935,366.949L135.516,364.797L135.549,363.112L135.647,358.06L135.671,356.835L135.825,356.838L136.355,353.325L137.017,350.887L137.981,348.761L137.993,348.149L138.158,347.539L138.173,346.774L137.574,345.996L137.275,345.531L136.974,345.219L133.927,343.781L133.168,343.306L132.716,342.838L132.116,342.06L131.516,341.283L131.073,340.355L131.082,339.896L130.509,337.74L130.265,334.519L130.378,328.7L131.062,325.19L132.685,320.78L133.622,320.032L134.399,319.588L134.86,319.597L136.559,319.171L139.018,319.219L142.86,319.294L143.474,319.305L144.875,318.414L145.502,317.813L145.975,317.21L146.309,315.838L150.821,289.426L150.851,287.895L149.965,286.04L148.304,284.476L146.198,282.137L144.856,279.966L144.865,279.507L142.824,273.8L142.851,272.422L142.887,270.584L143.917,265.09L144.742,262.196L144.781,260.205L143.957,255.134L144.909,253.621L144.921,253.009L145.083,252.552L144.203,250.391L143.781,248.391L143.79,247.932L143.802,247.319L144.124,246.56L144.91,245.656L145.537,245.055L146.158,244.761L147.089,244.32L148.17,244.035L153.702,244.142L155.405,243.563L159.427,242.263L160.358,241.821L161.138,241.224L161.921,240.473L162.238,240.02L162.262,238.795L162.611,236.657L161.986,229.293L160.695,224.519L160.421,222.829L158.962,218.818L158.516,218.043L157.916,217.266L155.351,214.765L154.752,213.987L154.459,213.216L154.465,212.909L154.32,212.447L154.35,210.916L154.534,209.388L155.181,207.715L156.455,205.443L159.133,202.125L159.441,202.131L159.757,201.678L161.932,200.495L166.85,200.591L172.252,199.47L177.483,199.266L182.725,198.449L198.836,199.989L215.323,198.013L220.856,198.121L235.699,201.627L260.478,200.118L285.163,195.545L323.971,192.013L324.287,191.559Z" },
    { id: "atacora", name: "Atacora", labelX: 60, labelY: 210, d: "M79.317,101.311L80.404,100.719L81.049,99.2L82.721,100.152L84.71,100.65L94.376,101.604L94.364,102.217L93.873,103.739L93.862,104.351L95.398,104.381L97.472,108.404L99.482,107.831L101.19,106.945L105.974,105.966L107.99,105.086L109.536,104.657L113.986,105.05L115.984,105.089L120.012,103.483L122.018,103.062L123.85,103.711L124.784,103.116L126.014,103.14L128.599,104.569L132.869,106.337L136.551,106.716L139.344,105.391L139.814,104.941L140.263,105.562L159.387,141.779L164.318,149.074L165.24,149.092L166.464,149.422L167.377,149.899L167.832,150.215L168.293,150.224L168.748,150.539L169.055,150.545L170.266,151.488L173.584,154.769L167.339,159.702L165.297,161.96L164.185,163.776L163.854,164.995L163.821,166.679L163.487,199.606L162.399,200.197L160.224,201.38L159.91,201.68L159.603,201.674L156.922,205.145L155.648,207.418L155,209.09L154.971,210.622L154.787,212.15L154.778,212.609L154.926,212.918L155.218,213.69L155.818,214.467L158.383,216.968L158.982,217.746L159.428,218.52L160.887,222.531L161.162,224.222L162.452,228.995L163.077,236.36L163.036,238.504L162.704,239.723L162.388,240.176L161.605,240.927L160.825,241.524L159.894,241.965L155.871,243.266L154.175,243.539L148.643,243.431L147.558,243.869L146.627,244.311L146.007,244.605L145.38,245.205L144.594,246.109L144.272,246.869L144.26,247.481L144.251,247.941L144.673,249.94L115.648,248.455L111.779,249.758L108.203,251.833L104.769,254.523L100.424,256.583L95.329,257.709L88.89,256.818L84.608,255.662L79.703,254.953L75.4,254.87L69.54,255.828L68.302,256.263L68.317,255.497L67.002,251.949L56.386,244.542L41.979,234.458L33.333,228.469L27.571,224.374L18.016,217.754L10.434,212.399L9.695,210.852L9.743,208.402L11.335,197.711L12.985,191.923L13.063,187.942L12.477,178.586L14.082,175.095L19.719,169.843L21.137,168.033L21.466,166.967L21.51,164.67L21.839,163.605L23.435,160.572L23.456,159.5L22.422,157.336L22.136,156.258L22.482,154.273L25.219,147.893L28.26,149.638L29.643,149.665L31.484,149.854L31.957,149.25L32.288,148.031L32.312,146.806L31.709,146.182L30.95,145.708L30.661,144.783L30.684,143.558L30.705,142.486L31.019,142.186L31.967,140.826L32.606,139.613L33.239,138.706L34.161,138.724L36.46,139.075L37.065,139.547L37.517,140.015L38.132,140.027L38.43,140.492L39.024,141.576L39.018,141.882L39.787,141.897L40.874,141.306L41.335,141.315L44.403,141.681L45.472,142.008L45.771,142.473L46.518,143.56L47.272,144.341L47.588,143.887L47.621,142.203L46.569,140.957L45.975,139.873L45.996,138.802L45.866,137.574L45.89,136.349L45.429,136.34L44.516,135.862L44.209,135.856L44.221,135.244L44.245,134.019L44.253,133.56L43.331,133.542L42.711,133.836L42.404,133.83L42.43,132.452L42.897,132.155L46.293,131.455L46.917,131.008L47.721,129.185L48.191,128.735L49.266,128.756L51.246,129.713L52.316,130.041L51.891,128.194L51.498,124.664L49.717,121.412L50.202,120.196L51.298,119.145L52.407,117.482L53.314,118.266L54.059,119.506L54.05,119.965L54.818,119.98L55.439,119.686L55.906,119.388L58.825,119.445L60.507,119.938L63.854,121.688L65.132,119.262L65.146,118.496L65.167,117.425L64.11,116.485L64.124,115.719L64.456,114.5L65.519,115.134L66.722,116.536L67.316,117.62L68.102,116.716L68.876,116.425L69.639,116.746L70.389,117.68L72.263,116.184L72.29,114.806L71.087,113.404L70.508,111.555L71.469,109.582L73.494,108.243L75.82,107.216L77.531,106.177L76.651,104.016L76.669,103.097L77.615,101.89L79.016,100.998L80.254,100.563L79.317,101.311Z" },
    { id: "donga", name: "Donga", labelX: 80, labelY: 300, d: "M74.647,325.01L72.709,321.908L71.253,317.744L70.688,307.317L69.515,304.384L67.807,305.27L66.3,303.709L65.272,301.238L65.007,299.088L65.495,297.719L67.392,294.999L68.034,293.633L68.097,290.417L68.425,289.352L68.449,288.127L67.927,283.368L68.082,275.406L67.995,264.069L68.145,256.413L69.383,255.978L75.246,254.867L79.549,254.951L84.451,255.812L88.733,256.968L95.172,257.859L100.267,256.733L104.612,254.674L108.046,251.983L111.622,249.909L115.491,248.605L144.516,250.09L145.396,252.252L145.387,252.711L145.224,253.168L145.221,253.321L144.27,254.834L145.093,259.905L145.054,261.895L144.229,264.79L143.2,270.284L143.164,272.121L143.137,273.499L145.024,279.204L145.015,279.663L146.51,281.837L148.617,284.175L150.277,285.74L151.163,287.595L151.134,289.126L146.622,315.538L146.287,316.91L145.815,317.513L145.188,318.114L144.254,318.708L143.793,318.699L143.172,318.993L139.331,318.918L136.872,318.871L135.176,319.144L134.715,319.135L133.934,319.732L132.997,320.48L131.374,324.89L130.845,328.403L130.731,334.222L130.976,337.443L131.395,339.596L131.386,340.055L132.136,340.989L132.736,341.766L133.336,342.544L133.788,343.012L134.547,343.486L137.594,344.924L137.895,345.237L138.193,345.702L138.64,346.477L138.625,347.242L138.613,347.855L138.601,348.467L137.637,350.593L136.975,353.031L136.445,356.543L136.267,357.765L136.169,362.818L136.136,364.503L136.555,366.655L136.845,367.58L137.137,368.351L137.737,369.129L138.49,369.91L139.246,370.537L140.157,371.168L142.136,372.125L152.222,375.232L152.83,375.55L153.138,375.556L153.737,376.334L152.744,379.991L151.913,383.191L152.811,384.434L153.552,385.827L155.064,395.047L153.507,403.901L154.228,406.366L154.831,406.99L154.038,408.2L152.634,409.245L151.701,409.84L150.459,410.428L148.76,410.855L146.301,410.807L145.687,410.795L145.072,410.783L142.33,409.504L141.1,409.48L138.645,409.279L138.03,409.267L137.575,408.952L136.364,408.009L135.909,407.694L133.007,406.718L132.094,406.241L131.184,405.61L130.43,404.83L128.932,402.809L128.631,402.497L128.176,402.182L127.715,402.173L127.106,401.855L124.033,401.795L123.418,401.783L122.804,401.771L122.195,401.452L121.285,400.822L118.576,397.859L117.819,397.231L116.909,396.601L115.843,396.121L115.228,396.109L113.999,396.085L112.302,396.358L103.342,398.634L102.266,398.613L101.651,398.601L99.654,398.562L92.278,398.418L92.396,384.482L92.581,374.988L92.491,363.805L92.742,350.943L92.028,348.172L91.307,345.707L89.227,341.99L83.058,335.13L75.081,326.397L74.635,325.622L74.647,325.01Z" },
    { id: "zou", name: "Zou", labelX: 130, labelY: 545, d: "M91.866,506.246L92.039,497.365L94.034,497.557L114.649,496.734L119.241,497.742L124.729,500.147L128.505,503.59L132.296,506.268L137.044,507.127L142.423,507.231L148.407,507.808L155.584,510.245L173.707,519.023L174.282,521.026L174.193,525.619L174.482,526.544L175.082,527.322L175.525,528.249L175.495,529.781L175.779,531.011L177.196,537.166L178.667,540.565L183.365,544.026L183.968,544.651L183.956,545.263L183.923,546.947L186.004,558.476L186.375,563.079L186.059,563.532L185.598,563.523L184.977,563.817L184.209,563.802L182.211,563.763L175.911,563.64L172.985,563.89L171.277,564.776L169.542,567.039L168.428,569.009L168.386,571.153L137.499,570.55L136.742,569.923L135.034,570.809L133.949,571.247L133.335,571.235L132.422,570.758L128.938,568.086L128.332,567.614L128.341,567.155L127.609,565.303L126.268,563.132L124.595,562.18L122.95,559.851L120.861,556.593L119.195,555.335L118.586,555.017L117.826,554.543L116.639,552.375L115.804,547.917L114.513,543.143L113.03,540.357L111.816,539.568L111.52,538.949L111.08,537.868L107.183,532.737L105.671,531.483L104.92,530.549L104.474,529.774L104.513,527.784L104.221,527.012L103.624,526.081L103.331,525.31L102.767,522.695L97.61,511.259L96.866,510.019L94.765,507.374L91.55,506.699L91.866,506.246Z" },
    { id: "couffo", name: "Couffo", labelX: 65, labelY: 570, d: "M84.608,571.051L84.454,571.048L83.414,569.19L81.56,561.801L89.243,561.951L91.096,561.528L91.389,546.522L91.678,531.67L91.977,516.358L92.174,506.252L95.389,506.928L97.49,509.573L98.234,510.812L103.391,522.248L103.955,524.863L104.248,525.635L104.844,526.565L104.83,527.331L105.098,529.327L105.544,530.102L106.295,531.036L107.807,532.291L111.704,537.421L112.144,538.502L112.44,539.121L113.654,539.91L115.137,542.696L116.427,547.47L117.263,551.928L118.45,554.096L119.21,554.57L119.818,554.888L121.485,556.146L123.574,559.404L125.219,561.733L126.892,562.685L128.233,564.856L128.658,566.702L128.649,567.161L129.408,567.636L132.892,570.308L133.808,570.632L134.423,570.644L135.504,570.359L137.213,569.473L137.969,570.1L138.843,572.568L138.352,574.09L137.714,575.303L135.943,579.405L135.464,580.314L134.678,581.218L133.09,583.791L132.762,584.857L132.744,585.776L132.72,587.001L132.681,588.991L131.398,591.723L125.158,588.538L121.949,587.556L118.568,587.49L113.015,588.454L106.516,590.625L96.79,592.733L94.485,592.688L92.801,592.349L87.32,589.638L86.859,589.629L87.651,588.419L88.142,586.897L87.575,584.435L86.848,582.277L86.423,580.43L86.456,578.746L87.308,574.474L87.335,573.096L86.28,572.003L84.764,570.901L84.608,571.051Z" },
    { id: "mono", name: "Mono", labelX: 70, labelY: 620, d: "M88.917,641.749L88.191,639.59L90.363,638.56L103.485,635.753L105.636,635.795L103.788,628.1L101.939,620.405L99.41,616.067L98.5,615.436L96.37,614.322L95.767,613.698L95.785,612.779L95.827,610.636L95.848,609.564L95.097,608.63L93.434,607.219L93.141,606.448L93.165,605.223L92.249,604.898L90.252,604.859L89.492,604.385L88.582,603.755L87.829,602.974L87.229,602.197L86.943,601.119L86.961,600.2L87.286,599.287L87.301,598.522L86.264,596.51L84.902,595.411L84.311,594.174L85.124,591.893L86.7,589.932L87.161,589.941L92.636,592.958L94.326,592.991L96.625,593.342L106.351,591.234L112.85,589.063L118.406,587.946L121.786,588.012L124.993,589.147L131.233,592.332L130.568,594.923L130.532,596.761L130.511,597.832L130.189,598.592L129.406,599.343L128.933,599.946L128.14,601.156L127.815,602.069L127.797,602.988L127.743,605.744L127.937,611.568L127.896,613.712L127.411,614.928L126.766,616.447L124.348,622.22L123.845,624.355L124.09,627.577L125.581,629.903L126.453,632.524L126.724,634.368L126.706,635.286L116.079,636.305L88.912,642.055L88.917,641.749Z" },
    { id: "atlantique", name: "Atlantique", labelX: 150, labelY: 610, d: "M164.766,630.667L159.379,631.022L151.199,632.7L126.712,634.98L126.73,634.061L126.458,632.218L125.587,629.597L124.095,627.27L123.85,624.049L124.353,621.914L126.772,616.141L127.416,614.621L127.747,613.402L127.789,611.259L127.595,605.434L127.649,602.678L127.667,601.76L127.992,600.847L128.784,599.637L129.257,599.033L130.041,598.283L130.363,597.523L130.384,596.451L130.42,594.614L131.085,592.023L132.522,589.294L132.561,587.303L132.277,586.072L132.295,585.154L132.777,584.091L134.364,581.518L135.151,580.614L135.63,579.704L137.401,575.603L138.039,574.39L138.53,572.868L137.656,570.4L168.389,570.999L171.816,576.58L172.811,580.736L173.002,586.713L173.248,597.747L173.188,600.809L173.775,610.164L174.811,612.176L175.426,612.188L176.035,612.506L176.49,612.821L177.701,613.764L178.073,618.366L177.564,620.807L175.796,624.755L171.02,625.275L168.857,625.845L166.989,627.034L165.736,628.235L164.766,630.667Z" },
    { id: "littoral", name: "Littoral", labelX: 155, labelY: 644, d: "M177.387,629.841L164.609,630.817L165.579,628.385L166.832,627.184L168.7,625.995L170.863,625.425L175.639,624.905L175.29,627.043L176.046,627.67L176.507,627.679L176.959,628.148L176.926,629.832L177.387,629.841Z" },
    { id: "oueme", name: "Ouémé", labelX: 175, labelY: 590, d: "M200.999,617.282L200.141,621.86L200.019,628.138L177.541,629.844L177.574,628.16L176.812,627.839L176.351,627.83L175.598,627.049L175.947,624.911L177.715,620.963L178.223,618.522L177.852,613.92L176.641,612.977L176.186,612.662L175.577,612.344L174.962,612.332L173.928,610.167L173.342,600.812L173.402,597.75L173.156,586.716L172.965,580.739L171.97,576.584L168.546,570.849L168.588,568.706L169.856,566.739L171.591,564.475L173.299,563.589L176.225,563.34L182.525,563.463L182.27,568.666L183.091,573.89L187.778,585.776L189.697,597.761L191.631,601.016L196.468,605.246L197.972,606.96L201.836,613.775L201.508,614.841L201.159,616.978L200.999,617.282Z" },
    { id: "collines", name: "Collines", labelX: 120, labelY: 460, d: "M199.689,471.586L199.68,472.046L200.578,473.289L201.597,476.219L204.002,479.023L204.894,480.572L205.171,482.109L203.981,495.872L182.928,495.461L181.545,495.434L179.925,499.692L179.561,502.595L180.279,505.213L179.95,506.279L178.405,506.708L177.317,507.3L174.001,511.83L172.726,514.103L172.986,516.559L173.704,519.177L155.581,510.399L148.404,507.961L142.42,507.385L137.041,507.28L132.29,506.575L128.499,503.897L124.723,500.453L119.235,498.049L114.643,497.04L94.028,497.864L92.03,497.825L92.069,495.834L92.466,475.469L92.783,459.239L93.409,442.861L93.639,431.071L92.891,422.173L92.448,421.245L91.833,421.233L91.537,420.614L92.046,418.173L92.097,415.57L95.739,410.127L96.082,408.296L95.642,407.215L93.095,403.795L92.658,402.562L92.682,401.337L92.588,398.271L94.432,398.307L99.958,398.721L101.956,398.76L102.573,398.619L103.649,398.64L112.61,396.364L114.306,396.091L115.535,396.115L116.15,396.127L117.217,396.607L118.127,397.237L118.883,397.865L121.592,400.828L122.502,401.458L123.117,401.47L123.726,401.789L124.34,401.801L127.414,401.861L128.028,401.873L128.938,402.503L129.24,402.815L130.738,404.836L131.491,405.616L132.401,406.247L133.314,406.724L136.216,407.7L136.671,408.015L137.882,408.958L138.343,408.967L138.952,409.285L141.411,409.333L142.637,409.51L145.382,410.636L145.997,410.648L146.609,410.813L149.067,410.861L150.77,410.281L152.011,409.693L152.945,409.098L154.349,408.053L155.141,406.843L154.538,406.219L153.818,403.754L155.374,394.9L153.863,385.68L153.121,384.287L152.223,383.044L153.054,379.844L206.979,381.508L208.487,406.658L208.735,409.726L207.898,413.233L207.106,414.443L205.063,416.701L204.425,417.914L204.407,418.833L204.678,420.676L204.66,421.595L203.808,425.867L203.77,427.858L204.029,430.313L204.753,432.625L206.667,436.951L207.393,439.11L207.349,441.407L206.391,443.226L205.282,444.89L204.481,446.559L204.138,448.39L204.019,454.515L202.353,461.069L201.767,467.491L201.442,468.404L200.327,470.373L200.005,471.133L199.996,471.592L199.689,471.586Z" },
    { id: "plateau", name: "Plateau", labelX: 190, labelY: 530, d: "M203.981,495.872L203.608,499.234L204.145,503.227L206.068,507.094L209.07,510.829L211.3,514.702L210.909,518.983L210.584,519.896L210.572,520.508L210.108,520.653L207.966,520.151L206.89,520.13L206.113,520.575L205.785,521.641L207.443,546.947L207.416,548.325L206.938,549.235L206.148,550.292L205.188,552.264L204.715,552.868L204.7,553.633L204.98,555.017L205.881,556.107L208.452,558.302L209.049,559.232L208.567,560.295L207.479,560.887L206.087,561.319L204.846,561.907L202.162,565.531L202.397,569.212L203.703,573.22L204.08,577.517L202.921,581.783L202.572,583.92L202.994,585.92L203.741,587.007L204.652,587.637L205.721,587.964L206.951,587.988L207.553,588.613L207.532,589.685L208.055,594.443L207.416,595.656L206.172,596.398L204.295,598.046L203.024,600.166L202.982,602.31L203.667,606.612L203.625,608.755L201.366,614.226L197.502,607.411L195.998,605.696L191.161,601.466L189.226,598.212L187.308,586.227L182.621,574.341L181.8,569.117L181.902,563.911L184.053,563.953L184.821,563.968L185.436,563.98L185.897,563.989L186.213,563.535L186.216,563.382L185.845,558.78L183.764,547.251L183.797,545.567L183.808,544.954L183.206,544.33L178.508,540.868L177.037,537.47L175.619,531.315L175.336,530.084L175.366,528.553L174.923,527.625L174.323,526.848L174.034,525.923L174.123,521.33L173.547,519.327L172.83,516.709L172.57,514.253L173.844,511.98L177.161,507.45L178.249,506.858L179.794,506.429L180.122,505.363L179.405,502.745L179.769,499.842L181.389,495.585L182.772,495.612L203.825,496.022L203.981,495.872Z" },
];

const CITIES: City[] = [
    { id: "karimama", name: "Karimama", department: "alibori", x: 190, y: 25 },
    { id: "malanville", name: "Malanville", department: "alibori", x: 255, y: 45 },
    { id: "kandi", name: "Kandi", department: "alibori", x: 230, y: 110 },
    { id: "banikoara", name: "Banikoara", department: "alibori", x: 170, y: 160 },
    { id: "natitingou", name: "Natitingou", department: "atacora", x: 65, y: 205 },
    { id: "kouande", name: "Kouandé", department: "atacora", x: 110, y: 230 },
    { id: "djougou", name: "Djougou", department: "donga", x: 100, y: 290 },
    { id: "parakou", name: "Parakou", department: "borgou", x: 188, y: 268 },
    { id: "bante", name: "Bantè", department: "collines", x: 110, y: 460 },
    { id: "dassa-zoume", name: "Dassa-Zoumè", department: "collines", x: 150, y: 430 },
    { id: "djidja", name: "Djidja", department: "zou", x: 105, y: 515 },
    { id: "lokossa", name: "Lokossa", department: "mono", x: 100, y: 600 },
    { id: "come", name: "Comè", department: "mono", x: 115, y: 635 },
    { id: "porto-novo", name: "Porto-Novo", department: "oueme", x: 178, y: 598 },
    { id: "cotonou", name: "Cotonou", department: "littoral", x: 171, y: 628 },
];

const CENTERS: Center[] = [
    { id: "c1", name: "Agence Nationale pour la Transfusion Sanguine (siège)", type: "sts", cityId: "cotonou", address: "Saint-Michel, en face de l'école St Augustin", contact: "" },
    { id: "c2", name: "STS Littoral", type: "sts", cityId: "cotonou", address: "Dans l'enceinte du CNHU-HKM", contact: "" },
    { id: "c3", name: "STS Ouémé", type: "sts", cityId: "porto-novo", address: "À côté de la maison des jeunes de Djègan Kpèvi", contact: "" },
    { id: "c4", name: "STS Mono", type: "sts", cityId: "lokossa", address: "Derrière l'hôpital de zone de Lokossa", contact: "" },
    { id: "c5", name: "PTS Comè", type: "pts", cityId: "come", address: "Dans l'enceinte de l'hôpital de zone de Comè", contact: "" },
    { id: "c6", name: "PTS Djidja", type: "pts", cityId: "djidja", address: "Dans l'enceinte de l'hôpital de zone de Djidja (Mougnon)", contact: "" },
    { id: "c7", name: "STS Collines", type: "sts", cityId: "dassa-zoume", address: "Dans l'enceinte de l'hôpital de zone de Dassa-Zoumè", contact: "" },
    { id: "c8", name: "BS Bantè", type: "pts", cityId: "bante", address: "Au centre de santé de Bantè", contact: "" },
    { id: "c9", name: "STS Borgou", type: "sts", cityId: "parakou", address: "À Parakou, en face de l'ORTB Parakou", contact: "" },
    { id: "c10", name: "STS Donga", type: "sts", cityId: "djougou", address: "Dans l'enceinte de l'hôpital Ordre de Malte", contact: "" },
    { id: "c11", name: "PTS Kouandé", type: "pts", cityId: "kouande", address: "Dans l'enceinte de l'hôpital de zone de Kouandé", contact: "" },
    { id: "c12", name: "STS Atacora", type: "sts", cityId: "natitingou", address: "Dans l'enceinte de la DDS Atacora", contact: "" },
    { id: "c13", name: "STS Kandi", type: "sts", cityId: "kandi", address: "Dans l'enceinte de l'hôpital de zone de Kandi", contact: "" },
    { id: "c14", name: "PTS Banikoara", type: "pts", cityId: "banikoara", address: "Dans l'enceinte de l'hôpital de zone de Banikoara", contact: "" },
    { id: "c15", name: "PTS Malanville", type: "pts", cityId: "malanville", address: "Dans l'enceinte de l'hôpital de zone de Malanville", contact: "" },
    { id: "c16", name: "PTS Karimama", type: "pts", cityId: "karimama", address: "Au Centre de Santé de Karimama", contact: "" },
];

/* ─────────────────────────── helpers ─────────────────────────── */

function getCityForCenter(center: Center) {
    return CITIES.find((c) => c.id === center.cityId);
}

function getDeptForCity(city: City | undefined) {
    return city ? DEPARTMENTS.find((d) => d.id === city.department) : undefined;
}

/* ─────────────────────────── component ─────────────────────────── */

export function MapSection() {
    const [selectedDept, setSelectedDept] = useState<string | null>(null);
    const [hoveredDept, setHoveredDept] = useState<string | null>(null);

    // ── filtres ──
    const [searchQuery, setSearchQuery] = useState("");
    const [typeFilter, setTypeFilter] = useState<"all" | "sts" | "pts">("all");
    const [deptFilter, setDeptFilter] = useState<string>("all");

    const hasActiveFilters =
        searchQuery.trim() !== "" || typeFilter !== "all" || deptFilter !== "all";

    // ── centres filtrés (les 3 params combinés) ──
    const filteredCenters = useMemo(() => {
        const q = searchQuery.trim().toLowerCase();

        return CENTERS.filter((center) => {
            const city = getCityForCenter(center);
            const dept = getDeptForCity(city);

            // 1. recherche texte
            const matchesQuery =
                q === "" ||
                center.name.toLowerCase().includes(q) ||
                center.address.toLowerCase().includes(q) ||
                (city?.name.toLowerCase().includes(q) ?? false) ||
                (dept?.name.toLowerCase().includes(q) ?? false);

            // 2. type de structure
            const matchesType = typeFilter === "all" || center.type === typeFilter;

            // 3. département
            const matchesDept = deptFilter === "all" || city?.department === deptFilter;

            return matchesQuery && matchesType && matchesDept;
        });
    }, [searchQuery, typeFilter, deptFilter]);

    // départements concernés par les résultats filtrés → highlight sur la carte
    const highlightedDepts = useMemo(() => {
        const set = new Set<string>();
        for (const center of filteredCenters) {
            const city = getCityForCenter(center);
            if (city) set.add(city.department);
        }
        return set;
    }, [filteredCenters]);

    // villes concernées par les résultats filtrés → pins sur la carte
    const highlightedCities = useMemo(() => {
        const set = new Set<string>();
        for (const center of filteredCenters) {
            set.add(center.cityId);
        }
        return set;
    }, [filteredCenters]);

    // auto-select du département quand les filtres ne touchent qu'un seul
    useEffect(() => {
        if (hasActiveFilters && highlightedDepts.size === 1) {
            setSelectedDept(Array.from(highlightedDepts)[0]);
        }
    }, [hasActiveFilters, highlightedDepts]);

    // synchroniser le filtre département ↔ sélection carte
    useEffect(() => {
        if (deptFilter !== "all") {
            setSelectedDept(deptFilter);
        }
    }, [deptFilter]);

    // ── centres pour le département sélectionné (sans filtres) ──
    const citiesInDept = useMemo(
        () => CITIES.filter((c) => c.department === selectedDept),
        [selectedDept]
    );

    const centersByCity = useMemo(() => {
        const map = new Map<string, Center[]>();
        for (const city of citiesInDept) {
            map.set(city.id, CENTERS.filter((c) => c.cityId === city.id));
        }
        return map;
    }, [citiesInDept]);

    // ── compteurs par département (tenant compte des filtres actifs) ──
    const countByDept = useMemo(() => {
        const map = new Map<string, number>();
        for (const center of filteredCenters) {
            const city = getCityForCenter(center);
            if (city) {
                map.set(city.department, (map.get(city.department) ?? 0) + 1);
            }
        }
        return map;
    }, [filteredCenters]);

    // ── actions ──
    function selectDept(id: string) {
        const next = selectedDept === id ? null : id;
        setSelectedDept(next);
        // synchroniser le select du filtre
        setDeptFilter(next ?? "all");
    }

    function handleKeyDown(e: React.KeyboardEvent, id: string) {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            selectDept(id);
        }
    }

    function resetFilters() {
        setSearchQuery("");
        setTypeFilter("all");
        setDeptFilter("all");
        setSelectedDept(null);
    }

    const selectedDeptName = DEPARTMENTS.find((d) => d.id === selectedDept)?.name;

    // ── résultats groupés par département puis ville ──
    const groupedResults = useMemo(() => {
        const groups: {
            dept: Department;
            cities: { city: City; centers: Center[] }[];
        }[] = [];

        const deptIds = Array.from(highlightedDepts);

        for (const deptId of deptIds) {
            const dept = DEPARTMENTS.find((d) => d.id === deptId);
            if (!dept) continue;

            const deptCities = CITIES.filter((c) => c.department === deptId);
            const cityGroups: { city: City; centers: Center[] }[] = [];

            for (const city of deptCities) {
                const centers = filteredCenters.filter((c) => c.cityId === city.id);
                if (centers.length > 0) {
                    cityGroups.push({ city, centers });
                }
            }

            if (cityGroups.length > 0) {
                groups.push({ dept, cities: cityGroups });
            }
        }

        return groups;
    }, [filteredCenters, highlightedDepts]);

    /* ─────────────────── carte : couleurs ─────────────────── */

    function getDeptFill(deptId: string) {
        const isSelected = deptId === selectedDept;
        const isHovered = deptId === hoveredDept;
        const isHighlighted = hasActiveFilters && highlightedDepts.has(deptId);
        const isDimmed = hasActiveFilters && !isHighlighted;

        if (isSelected) return "var(--color-primary-100)";
        if (isHighlighted && isHovered) return "var(--color-primary-50)";
        if (isHighlighted) return "var(--color-primary-50)";
        if (isDimmed) return "var(--color-neutral-100)";
        if (isHovered) return "var(--color-neutral-100)";
        return "var(--color-neutral-50)";
    }

    function getDeptStroke(deptId: string) {
        const isSelected = deptId === selectedDept;
        const isHighlighted = hasActiveFilters && highlightedDepts.has(deptId);

        if (isSelected) return "var(--color-primary-500)";
        if (isHighlighted) return "var(--color-primary-300)";
        return "var(--color-neutral-300)";
    }

    function getDeptStrokeWidth(deptId: string) {
        return deptId === selectedDept ? 1.5 : 1;
    }

    function getDeptLabelColor(deptId: string) {
        const isSelected = deptId === selectedDept;
        const isDimmed = hasActiveFilters && !highlightedDepts.has(deptId);

        if (isSelected) return "var(--color-primary-600)";
        if (isDimmed) return "var(--color-neutral-300)";
        return "var(--color-neutral-500)";
    }

    function getDeptLabelWeight(deptId: string) {
        return deptId === selectedDept ? 600 : 400;
    }

    function getDeptOpacity(deptId: string) {
        const isDimmed = hasActiveFilters && !highlightedDepts.has(deptId);
        return isDimmed ? 0.5 : 1;
    }

    /* ─────────────────── carte : pins ─────────────────── */

    function isCityVisible(city: City) {
        if (hasActiveFilters) return highlightedCities.has(city.id);
        return city.department === selectedDept;
    }

    /* ─────────────────── render center card ─────────────────── */

    function renderCenterCard(center: Center, showCity = false) {
        const city = getCityForCenter(center);
        return (
            <li
                key={center.id}
                className="rounded-lg border border-neutral-200 bg-white p-4 transition-shadow hover:shadow-sm"
            >
                <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                        <p className="font-heading text-body font-semibold text-secondary">
                            {center.name}
                        </p>
                        {showCity && city && (
                            <p className="mt-0.5 flex items-center gap-1 text-small text-neutral-500">
                                <MapPin className="h-3 w-3 shrink-0" aria-hidden="true" />
                                {city.name}
                            </p>
                        )}
                    </div>
                    <span
                        className={[
                            "shrink-0 rounded-full px-2 py-0.5 text-xs font-medium",
                            center.type === "sts"
                                ? "bg-primary-50 text-primary-600"
                                : "bg-neutral-100 text-neutral-600",
                        ].join(" ")}
                    >
                        {center.type.toUpperCase()}
                    </span>
                </div>
                <p className="mt-1 text-small text-tertiary">{center.address}</p>
                <dl className="mt-3 grid grid-cols-2 gap-y-1 text-small text-tertiary">
                    <dt className="text-neutral-500">Horaires</dt>
                    <dd>{center.hours ?? "Lundi au Vendredi : 08h – 17h30"}</dd>
                    <dt className="text-neutral-500">Accueil</dt>
                    <dd className="capitalize">{center.appointment ?? "libre"}</dd>
                    <dt className="text-neutral-500">Dons acceptés</dt>
                    <dd>{center.donationTypes?.join(", ") ?? "Sang Total"}</dd>
                    <dt className="text-neutral-500">Contacts</dt>
                    <dd>{center.contact || "+229 21 32 04 35"}</dd>
                </dl>
            </li>
        );
    }

    /* ─────────────────── render ─────────────────── */

    return (
        <section id="centres" className="bg-white py-20 sm:py-28">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* En-tête */}
                <div className="max-w-2xl">
                    <h2 className="mt-2 text-h2 text-secondary">
                        Trouvez un centre près de chez vous
                    </h2>
                    <p className="mt-4 text-body-lg text-tertiary">
                        Cherchez par ville ou par nom, filtrez par type de structure ou par
                        département — ou explorez directement la carte.
                    </p>
                </div>

                {/* ── Barre de filtres ── */}
                <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-end">
                    {/* Recherche texte */}
                    <div className="relative flex-1">
                        <label htmlFor="center-search" className="sr-only">
                            Rechercher une ville ou un centre
                        </label>
                        <Search
                            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400"
                            aria-hidden="true"
                        />
                        <input
                            id="center-search"
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Rechercher une ville, un centre…"
                            className="w-full rounded-lg border border-neutral-300 py-2.5 pl-10 pr-10 text-body text-secondary placeholder:text-neutral-400 focus-visible:border-primary-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/20"
                        />
                        {searchQuery && (
                            <button
                                type="button"
                                onClick={() => setSearchQuery("")}
                                className="absolute right-3 top-1/2 -translate-y-1/2 rounded p-0.5 text-neutral-400 hover:text-neutral-600"
                                aria-label="Effacer la recherche"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        )}
                    </div>

                    {/* Type de structure */}
                    <div>
                        <label htmlFor="filter-type" className="mb-1 block text-small font-medium text-neutral-500">
                            Type
                        </label>
                        <select
                            id="filter-type"
                            value={typeFilter}
                            onChange={(e) => setTypeFilter(e.target.value as typeof typeFilter)}
                            className="rounded-lg border border-neutral-300 px-3 py-2.5 text-body text-secondary focus-visible:border-primary-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/20"
                        >
                            <option value="all">Tous les types</option>
                            <option value="sts">STS — Service</option>
                            <option value="pts">PTS — Poste</option>
                        </select>
                    </div>

                    {/* Département */}
                    <div>
                        <label htmlFor="filter-dept" className="mb-1 block text-small font-medium text-neutral-500">
                            Département
                        </label>
                        <select
                            id="filter-dept"
                            value={deptFilter}
                            onChange={(e) => {
                                const val = e.target.value;
                                setDeptFilter(val);
                                setSelectedDept(val === "all" ? null : val);
                            }}
                            className="rounded-lg border border-neutral-300 px-3 py-2.5 text-body text-secondary focus-visible:border-primary-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/20"
                        >
                            <option value="all">Tous les départements</option>
                            {DEPARTMENTS.map((d) => (
                                <option key={d.id} value={d.id}>
                                    {d.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Reset */}
                    {hasActiveFilters && (
                        <button
                            type="button"
                            onClick={resetFilters}
                            className="inline-flex items-center gap-1.5 self-end rounded-lg border border-neutral-300 px-3 py-2.5 text-small font-medium text-neutral-600 transition-colors hover:bg-neutral-50"
                        >
                            <X className="h-3.5 w-3.5" />
                            Réinitialiser
                        </button>
                    )}
                </div>

                {/* Filtres actifs — pills */}
                {hasActiveFilters && (
                    <div className="mt-4 flex flex-wrap items-center gap-2">
                        <Filter className="h-4 w-4 text-neutral-400" aria-hidden="true" />
                        {searchQuery.trim() !== "" && (
                            <span className="inline-flex items-center gap-1 rounded-full bg-primary-50 px-2.5 py-0.5 text-xs font-medium text-primary-700">
                                « {searchQuery.trim()} »
                                <button
                                    type="button"
                                    onClick={() => setSearchQuery("")}
                                    aria-label={`Retirer le filtre "${searchQuery.trim()}"`}
                                    className="ml-0.5 rounded-full p-0.5 hover:bg-primary-100"
                                >
                                    <X className="h-3 w-3" />
                                </button>
                            </span>
                        )}
                        {typeFilter !== "all" && (
                            <span className="inline-flex items-center gap-1 rounded-full bg-primary-50 px-2.5 py-0.5 text-xs font-medium text-primary-700">
                                {typeFilter === "sts" ? "STS" : "PTS"}
                                <button
                                    type="button"
                                    onClick={() => setTypeFilter("all")}
                                    aria-label="Retirer le filtre type"
                                    className="ml-0.5 rounded-full p-0.5 hover:bg-primary-100"
                                >
                                    <X className="h-3 w-3" />
                                </button>
                            </span>
                        )}
                        {deptFilter !== "all" && (
                            <span className="inline-flex items-center gap-1 rounded-full bg-primary-50 px-2.5 py-0.5 text-xs font-medium text-primary-700">
                                {DEPARTMENTS.find((d) => d.id === deptFilter)?.name}
                                <button
                                    type="button"
                                    onClick={() => {
                                        setDeptFilter("all");
                                        setSelectedDept(null);
                                    }}
                                    aria-label="Retirer le filtre département"
                                    className="ml-0.5 rounded-full p-0.5 hover:bg-primary-100"
                                >
                                    <X className="h-3 w-3" />
                                </button>
                            </span>
                        )}
                        <span className="text-xs text-neutral-500">
                            — {filteredCenters.length} centre{filteredCenters.length > 1 ? "s" : ""}
                        </span>
                    </div>
                )}

                {/* ── Grille carte + résultats ── */}
                <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:items-start">
                    {/* Panneau résultats */}
                    <div>
                        {/* Légende */}
                        <p className="mb-1 text-small font-medium text-neutral-500">
                            <span className="mr-3 inline-flex items-center gap-1">
                                <span className="h-2 w-2 rounded-full bg-primary-500" /> STS — Service de Transfusion
                            </span>
                            <span className="inline-flex items-center gap-1">
                                <span className="h-2 w-2 rounded-full bg-secondary" /> PTS — Poste de Transfusion
                            </span>
                        </p>

                        {/* ── Mode filtres actifs ── */}
                        {hasActiveFilters ? (
                            <div className="mt-4">
                                {filteredCenters.length === 0 ? (
                                    <div className="rounded-lg border border-dashed border-neutral-300 p-6 text-center">
                                        <p className="text-body text-tertiary">
                                            Aucun centre ne correspond à vos critères.
                                        </p>
                                        <button
                                            type="button"
                                            onClick={resetFilters}
                                            className="mt-3 text-small font-medium text-primary-600 hover:text-primary-700"
                                        >
                                            Réinitialiser les filtres
                                        </button>
                                    </div>
                                ) : (
                                    <div className="space-y-6">
                                        {groupedResults.map(({ dept, cities }) => (
                                            <div key={dept.id}>
                                                <h3 className="mb-3 font-heading text-h4 text-secondary">
                                                    {dept.name}
                                                    <span className="ml-2 text-small font-normal text-neutral-400">
                                                        {countByDept.get(dept.id) ?? 0} centre
                                                        {(countByDept.get(dept.id) ?? 0) > 1 ? "s" : ""}
                                                    </span>
                                                </h3>
                                                {cities.map(({ city, centers }) => (
                                                    <div key={city.id} className="mb-4">
                                                        <p className="mb-2 flex items-center gap-1.5 text-small font-semibold uppercase tracking-wide text-neutral-500">
                                                            <MapPin className="h-3 w-3" aria-hidden="true" />
                                                            {city.name}
                                                        </p>
                                                        <ul className="space-y-3">
                                                            {centers.map((c) => renderCenterCard(c))}
                                                        </ul>
                                                    </div>
                                                ))}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ) : !selectedDept ? (
                            /* ── Aucun département sélectionné ── */
                            <div className="mt-6 rounded-lg border border-dashed border-neutral-300 p-6 text-center">
                                <p className="text-body text-tertiary">
                                    Sélectionnez un département sur la carte ou utilisez les filtres
                                    pour voir les centres disponibles.
                                </p>
                            </div>
                        ) : (
                            /* ── Département sélectionné (sans filtres) ── */
                            <div className="mt-4">
                                <h3 className="mb-4 font-heading text-h4 text-secondary">
                                    Centres — {selectedDeptName}
                                </h3>

                                {citiesInDept.length === 0 ? (
                                    <p className="text-body text-tertiary">
                                        Aucun centre référencé pour ce département pour le moment.
                                    </p>
                                ) : (
                                    <div className="space-y-5">
                                        {citiesInDept.map((city) => {
                                            const centers = centersByCity.get(city.id) ?? [];
                                            if (centers.length === 0) return null;
                                            return (
                                                <div key={city.id}>
                                                    <p className="mb-2 flex items-center gap-1.5 text-small font-semibold uppercase tracking-wide text-neutral-500">
                                                        <MapPin className="h-3 w-3" aria-hidden="true" />
                                                        {city.name}
                                                    </p>
                                                    <ul className="space-y-3">
                                                        {centers.map((c) => renderCenterCard(c))}
                                                    </ul>
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* ── Carte ── */}
                    <div className="relative mx-auto w-full max-w-sm lg:sticky lg:top-24">
                        <svg
                            viewBox="0 0 329 647"
                            className="h-auto w-full"
                            role="img"
                            aria-label="Carte des départements du Bénin. Sélectionner un département pour afficher ses centres de don de sang."
                        >
                            {DEPARTMENTS.map((dept) => (
                                <g
                                    key={dept.id}
                                    style={{ opacity: getDeptOpacity(dept.id) }}
                                    className="transition-opacity duration-300"
                                >
                                    <path
                                        d={dept.d}
                                        tabIndex={0}
                                        role="button"
                                        aria-pressed={dept.id === selectedDept}
                                        aria-label={`Département ${dept.name}${dept.id === selectedDept ? ", sélectionné" : ""}${countByDept.has(dept.id) ? ` — ${countByDept.get(dept.id)} centre${(countByDept.get(dept.id) ?? 0) > 1 ? "s" : ""}` : ""}`}
                                        onClick={() => selectDept(dept.id)}
                                        onKeyDown={(e) => handleKeyDown(e, dept.id)}
                                        onMouseEnter={() => setHoveredDept(dept.id)}
                                        onMouseLeave={() => setHoveredDept(null)}
                                        className="cursor-pointer transition-colors duration-200"
                                        fill={getDeptFill(dept.id)}
                                        stroke={getDeptStroke(dept.id)}
                                        strokeWidth={getDeptStrokeWidth(dept.id)}
                                    />
                                    <text
                                        x={dept.labelX}
                                        y={dept.labelY}
                                        textAnchor="middle"
                                        className="pointer-events-none select-none font-body text-[9px]"
                                        fill={getDeptLabelColor(dept.id)}
                                        fontWeight={getDeptLabelWeight(dept.id)}
                                    >
                                        {dept.name}
                                    </text>
                                    {/* Compteur de centres sur la carte */}
                                    {hasActiveFilters && (countByDept.get(dept.id) ?? 0) > 0 && (
                                        <>
                                            <circle
                                                cx={dept.labelX}
                                                cy={dept.labelY + 14}
                                                r="8"
                                                fill="var(--color-primary-500)"
                                                className="pointer-events-none"
                                            />
                                            <text
                                                x={dept.labelX}
                                                y={dept.labelY + 17.5}
                                                textAnchor="middle"
                                                className="pointer-events-none select-none font-heading text-[8px] font-bold"
                                                fill="white"
                                            >
                                                {countByDept.get(dept.id)}
                                            </text>
                                        </>
                                    )}
                                </g>
                            ))}

                            {/* Pins villes */}
                            {CITIES.map((city) => {
                                const visible = isCityVisible(city);
                                return (
                                    <g
                                        key={city.id}
                                        transform={`translate(${city.x}, ${city.y})`}
                                        className="transition-opacity duration-300"
                                        style={{
                                            opacity: visible ? 1 : 0,
                                            pointerEvents: visible ? "auto" : "none",
                                        }}
                                    >
                                        <circle
                                            r="5"
                                            fill="var(--color-primary-500)"
                                            stroke="white"
                                            strokeWidth="1.5"
                                        />
                                        <text
                                            y="-10"
                                            textAnchor="middle"
                                            className="pointer-events-none select-none font-heading text-[10px] font-semibold"
                                            fill="var(--color-secondary)"
                                        >
                                            {city.name}
                                        </text>
                                    </g>
                                );
                            })}
                        </svg>
                    </div>
                </div>
            </div>
        </section>
    );
}