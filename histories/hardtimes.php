<?php
//Remove the following two lines before deploying copies of this file to the "histories" folder.


//Replace all the "include" lines in your pre-5.x histories with the following lines (up to the next comment)
include( "../begin.php");   //Nuke users must include "../../../begin.php" here
if( !$cms['support'] )
	$cms['tngpath'] = "../";
include($cms['tngpath'] ."genlib.php");
include($cms['tngpath'] ."getlang.php");
include($cms['tngpath'] ."$mylanguage/text.php");
tng_db_connect($database_host,$database_name,$database_username,$database_password) or exit;
include($cms['tngpath'] ."checklogin.php");
include($cms['tngpath'] . "log.php" );
//end of new include lines

$logstring = "<a href=\"/path_to_your_history_folder/this_file_name\">Hard Times</a>";
writelog($logstring);
preparebookmark($logstring);

//Note: histories created this way may function differently that other histories when placed in an "album". If that is annoying to you, consider creating
//your history by pasting the text into Admin/Media/Body Text instead.

// Remove the comments (leading slashes) on the next line if you don't want the TNG menu icons to show on your history page.
$flags[noicons] = true;
tng_header( "Hard Times", $flags ); 
?>
<?php echo tng_coreicons(); ?>
<DIV TYPE=HEADER>
	<P ALIGN=CENTER STYLE="margin-bottom: 0in"><FONT SIZE=4 STYLE="font-size: 16pt"><B>HARD
	TIMES</B></FONT></P>
	<P ALIGN=CENTER STYLE="margin-bottom: 0in">Grandparents Spencer</P>
	<P ALIGN=CENTER STYLE="margin-bottom: 0.2in"><FONT SIZE=1 STYLE="font-size: 8pt">by
	Mark Hollett - 2008</FONT></P>
</DIV>
<P ALIGN=LEFT STYLE="text-indent: 0.2in; margin-bottom: 0in">Grandma Willsea had been born Jessie
Spencer on 13 Feb 1904 to Arthur and Margaret Spencer (nee Armstrong)
at Leederville Western Australia. While she was very young her family
relocated to Meekatharra in the northern inland goldfields of Western
Australia. Jessie had one brother Arthur, and three sisters Lucy,
Gertrude and Doris. Doris the youngest was born premature
and was not expected to live. She was so tiny that she could not be
handled so they kept her on a pillow and carried her about. Doris did
survive and lived a long life, she never married but chose to stay at
home and in later years cared for her parents as they grew old. Her
mother Margaret Spencer lived to 102 so Doris was quite an old woman
herself by the time her parents had passed on. 
</P>
<P ALIGN=LEFT STYLE="text-indent: 0.2in; margin-bottom: 0in">When my grandmother Jessie was
approaching 100 herself I asked her if her mother had been a robust
kind on a woman. I was surprised when she replied OH NO she was very
frail for many years. Apparently when they were in Meekatharra the
children had to push and pull her everywhere. In those days the doctor passed through
Meekatharra once in a while so they had him come and access her
condition. The doctor told the family that he would have to operate
on his next visit. They were to scrub down the kitchen and prepare
the kitchen table for the operation. How’s that eh, and nana told
me this in a matter of fact kind of way. 
</P>
<P ALIGN=LEFT STYLE="text-indent: 0.2in; margin-bottom: 0in">Anyhow the story goes that when the
doctor returned he performed the operation. Nana said ‘I don’t
know what he did but there was a blood stain on the ceiling of the
kitchen from that day on'. After the operation their mother was more
unwell than before. All these years later we suspect the doctor had
left a germ behind after the operation. No one is sure what the
operation was for now. 
</P>
<P ALIGN=LEFT STYLE="text-indent: 0.2in; margin-bottom: 0in">After hearing this I went on to say to
Nana-How is it she lived so long and seemed so well late in life?
Nana went on to tell me that when the family relocated back to Perth
they took her to see many doctors with no joy. In the end they were
prepared to try just about anything. They had heard about a man who
was one of the first naturopaths in Perth and somewhat looked down
upon by the medical profession. Great grandmother went to see him and
he made her concoctions to drink and as a middle aged lady she became
well and lived a healthy life from that time on. 
</P>
<P ALIGN=LEFT STYLE="text-indent: 0.2in; margin-bottom: 0in">I now think it’s amazing that I met
this woman who was born in the 1860’s. I attended her 100<SUP>th</SUP>
birthday when I was about 6. She was still living in the family home.
It was a wonderful Victorian stone house and out the back beyond the
backyard was where great grandad Spencer had run his salvage
business. The other memory I have of great grandmother Spencer was of
a visit when she was in her bed and Dad was asking if she was
comfortable. She replied that she often felt cold in her bed. Dad
offered to get her an electric blanket. Her reaction was close to
panic. It was like dad had offered her an electric chair. The world
around her had changed and she was too old to bother with it. 
</P>
<P ALIGN=LEFT STYLE="text-indent: 0.2in; margin-bottom: 0in">When my nana was very old I asked about
her early diet. I though perhaps the food they ate and lifestyle was
the reason they lived so long. I was again surprised when she told me
they ate salted beef for just about every meal as it was available
and it could be stored in that climate. Jessie’s memories of living in
Meekatharra were of a very hard existence. The family struggled while
in the Murchison. Strangely I found a photo of them on the internet
recently with the caption “Mr &amp; Mrs Arthur Spencer with the
first motor vehicle in Meekatharra“. Confused I asked nana about
this and all she said was ”don’t let anyone tell you we drove
that car from Meekatharra to Cue-we pushed it most of the way” I
also asked mum how it could be that they had the first car if they
were struggling. Mum thinks they probably took the car up there with
them.</P>
<P ALIGN=LEFT STYLE="text-indent: 0.2in; margin-bottom: 0in">Jessie was happy when the family
returned to Perth. She was a young lady and Perth must have seemed an
exciting place after Meekatharra. I think she said she met my
grandfather at a dance as was common in those days. They were a great
team and worked hard to get established with a home and start a
family. In later years they travelled the world on ocean liners and
had many caravan holidays in Australia. By the time they were too old
for travel they had seen just about everything.</P>
<P ALIGN=LEFT STYLE="text-indent: 0.2in; margin-bottom: 0in">Jessie was a kind and generous person
with a charismatic personality. These qualities attracted people to
her all her life. Even as a very old woman people who met her would
take a liking to her. She’d had a basic education due to her early
years spent in the bush but she had an intelligence that went well
beyond anything that could be taught in a classroom. 
</P>
<P ALIGN=LEFT STYLE="text-indent: 0.2in; margin-bottom: 0in">Jessie’s 100th&nbsp;birthday in 2004
was a great affair with about 100 guests at her son Neville's home in
Spearwood. Neville who loves guns had organized riflemen dressed in
swan river colony military uniforms to give a traditional rifle
salute and then fire a real cannon of about the same vintage as nana.
Special permission had to be given for the firing of the cannon. It
was such a hit that I think they fired it 3 times during the
afternoon. Nana was well and had a great day. 
</P>
<P ALIGN=LEFT STYLE="text-indent: 0.2in; margin-bottom: 0in">Last year on the 17 March 2007 Jessie
peacefully slipped away. She was the last of her generation in our
family.</P>
<P ALIGN=LEFT STYLE="text-indent: 0.2in; margin-bottom: 0in"><BR>

<?php tng_footer( "" ); ?>
