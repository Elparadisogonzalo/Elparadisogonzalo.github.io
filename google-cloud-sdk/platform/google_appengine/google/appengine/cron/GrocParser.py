# $ANTLR 3.1.1 Groc.g

import sys
from antlr3 import *
from antlr3.compat import set, frozenset

# Copyright 2005-2009 Google, Inc.  All rights reserved.
# @author arb@google.com (Anthony Baxter)
# Based on original C++ version by
# @author estlin@google.com (Brian Estlin)

# Groc (Googley runner of commands) is a microlanguage that provides an
# alternative to traditional cron syntax/semantics for specifying
# recurrent events.  Syntactically, it is designed to be more readable
# (more easily 'grokked') than crontab language.  Groc forfeits certain
# semantics found in crontab, in favor of readability; however,
# certain timespecs which are awkward in crontab are much easier
# to express in Groc (for example, the 3rd tuesday of the month).
# It is these constructs to which Groc is best suited.
#
# Examples of valid Groc include:
# '1st,3rd monday of month 15:30'
# 'every wed,fri of jan,jun 13:15'
# 'first sunday of quarter 00:00'
# 'every 2 hours'
#
# FEATURES NOT YET IMPLEMENTED (in approx. order of priority):
# - some way to specify multiple values for minutes/hours (definitely)
# - 'am/pm' (probably)
# - other range/interval functionality (maybe)


# WARNING: This file is externally viewable by our users.  All comments from
# this file will be stripped.  The docstrings will NOT.  Do not put sensitive
# information in docstrings.  If you must communicate internal information in
# this source file, please place them in comments only.


allOrdinals = set([1, 2, 3, 4, 5])
numOrdinals = len(allOrdinals)




# for convenience in actions
HIDDEN = BaseRecognizer.HIDDEN

# token types
MONTH=28
THURSDAY=24
FOURTH_OR_FIFTH=17
THIRD=14
DECEMBER=40
FROM=42
EVERY=6
WEDNESDAY=23
QUARTER=41
SATURDAY=26
SYNCHRONIZED=9
JANUARY=29
SUNDAY=27
TUESDAY=22
SEPTEMBER=37
UNKNOWN_TOKEN=46
AUGUST=36
JULY=35
MAY=33
FRIDAY=25
DIGITS=8
FEBRUARY=30
TWO_DIGIT_HOUR_TIME=44
OF=4
WS=45
EOF=-1
ON=10
APRIL=32
COMMA=11
JUNE=34
OCTOBER=38
TIME=5
FIFTH=16
NOVEMBER=39
FIRST=12
DIGIT=7
FOURTH=15
MONDAY=21
HOURS=18
MARCH=31
SECOND=13
MINUTES=19
TO=43
DAY=20

# token names
tokenNames = [
    "<invalid>", "<EOR>", "<DOWN>", "<UP>",
    "OF", "TIME", "EVERY", "DIGIT", "DIGITS", "SYNCHRONIZED", "ON", "COMMA",
    "FIRST", "SECOND", "THIRD", "FOURTH", "FIFTH", "FOURTH_OR_FIFTH", "HOURS",
    "MINUTES", "DAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY",
    "SATURDAY", "SUNDAY", "MONTH", "JANUARY", "FEBRUARY", "MARCH", "APRIL",
    "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER",
    "DECEMBER", "QUARTER", "FROM", "TO", "TWO_DIGIT_HOUR_TIME", "WS", "UNKNOWN_TOKEN"
]




class GrocParser(Parser):
    grammarFileName = "Groc.g"
    antlr_version = version_str_to_tuple("3.1.1")
    antlr_version_str = "3.1.1"
    tokenNames = tokenNames

    def __init__(self, input, state=None):
        if state is None:
            state = RecognizerSharedState()

        Parser.__init__(self, input, state)


        self.dfa4 = self.DFA4(
            self, 4,
            eot = self.DFA4_eot,
            eof = self.DFA4_eof,
            min = self.DFA4_min,
            max = self.DFA4_max,
            accept = self.DFA4_accept,
            special = self.DFA4_special,
            transition = self.DFA4_transition
            )




        self.ordinal_set = set()
        self.weekday_set = set()
        self.month_set = set()
        self.monthday_set = set()
        self.time_string = ''
        self.interval_mins = 0
        self.period_string = ''
        self.synchronized = False
        self.start_time_string = ''
        self.end_time_string = ''










    valuesDict = {
        SUNDAY: 0,
        FIRST: 1,
        MONDAY: 1,
        JANUARY: 1,
        TUESDAY: 2,
        SECOND: 2,
        FEBRUARY: 2,
        WEDNESDAY: 3,
        THIRD: 3,
        MARCH: 3,
        THURSDAY: 4,
        FOURTH: 4,
        APRIL: 4,
        FRIDAY: 5,
        FIFTH: 5,
        MAY: 5,
        SATURDAY: 6,
        JUNE: 6,
        JULY: 7,
        AUGUST: 8,
        SEPTEMBER: 9,
        OCTOBER: 10,
        NOVEMBER: 11,
        DECEMBER: 12,
      }

    # Convert date tokens to int representations of properties.
    def ValueOf(self, token_type):
      return self.valuesDict.get(token_type, -1)




    # $ANTLR start "timespec"
    # Groc.g:92:1: timespec : ( specifictime | interval ) EOF ;
    def timespec(self, ):

        try:
            try:
                # Groc.g:93:3: ( ( specifictime | interval ) EOF )
                # Groc.g:93:5: ( specifictime | interval ) EOF
                pass
                # Groc.g:93:5: ( specifictime | interval )
                alt1 = 2
                LA1_0 = self.input.LA(1)

                if (LA1_0 == EVERY) :
                    LA1_1 = self.input.LA(2)

                    if ((DIGIT <= LA1_1 <= DIGITS)) :
                        alt1 = 2
                    elif ((DAY <= LA1_1 <= SUNDAY)) :
                        alt1 = 1
                    else:
                        nvae = NoViableAltException("", 1, 1, self.input)

                        raise nvae

                elif ((DIGIT <= LA1_0 <= DIGITS) or (FIRST <= LA1_0 <= FOURTH_OR_FIFTH)) :
                    alt1 = 1
                else:
                    nvae = NoViableAltException("", 1, 0, self.input)

                    raise nvae

                if alt1 == 1:
                    # Groc.g:93:7: specifictime
                    pass
                    self._state.following.append(self.FOLLOW_specifictime_in_timespec44)
                    self.specifictime()

                    self._state.following.pop()


                elif alt1 == 2:
                    # Groc.g:93:22: interval
                    pass
                    self._state.following.append(self.FOLLOW_interval_in_timespec48)
                    self.interval()

                    self._state.following.pop()



                self.match(self.input, EOF, self.FOLLOW_EOF_in_timespec52)




            except RecognitionException as re:
                self.reportError(re)
                self.recover(self.input, re)
        finally:

            pass

        return

    # $ANTLR end "timespec"


    # $ANTLR start "specifictime"
    # Groc.g:96:1: specifictime : ( ( ( ( ( ordinals weekdays ) | monthdays ) OF ( monthspec | quarterspec ) ) | ( ordinals weekdays ) ) TIME ) ;
    def specifictime(self, ):

        TIME1 = None

        try:
            try:
                # Groc.g:97:3: ( ( ( ( ( ( ordinals weekdays ) | monthdays ) OF ( monthspec | quarterspec ) ) | ( ordinals weekdays ) ) TIME ) )
                # Groc.g:97:5: ( ( ( ( ( ordinals weekdays ) | monthdays ) OF ( monthspec | quarterspec ) ) | ( ordinals weekdays ) ) TIME )
                pass
                # Groc.g:97:5: ( ( ( ( ( ordinals weekdays ) | monthdays ) OF ( monthspec | quarterspec ) ) | ( ordinals weekdays ) ) TIME )
                # Groc.g:97:7: ( ( ( ( ordinals weekdays ) | monthdays ) OF ( monthspec | quarterspec ) ) | ( ordinals weekdays ) ) TIME
                pass
                # Groc.g:97:7: ( ( ( ( ordinals weekdays ) | monthdays ) OF ( monthspec | quarterspec ) ) | ( ordinals weekdays ) )
                alt4 = 2
                alt4 = self.dfa4.predict(self.input)
                if alt4 == 1:
                    # Groc.g:97:8: ( ( ( ordinals weekdays ) | monthdays ) OF ( monthspec | quarterspec ) )
                    pass
                    # Groc.g:97:8: ( ( ( ordinals weekdays ) | monthdays ) OF ( monthspec | quarterspec ) )
                    # Groc.g:97:10: ( ( ordinals weekdays ) | monthdays ) OF ( monthspec | quarterspec )
                    pass
                    # Groc.g:97:10: ( ( ordinals weekdays ) | monthdays )
                    alt2 = 2
                    LA2_0 = self.input.LA(1)

                    if (LA2_0 == EVERY or (FIRST <= LA2_0 <= FOURTH_OR_FIFTH)) :
                        alt2 = 1
                    elif ((DIGIT <= LA2_0 <= DIGITS)) :
                        alt2 = 2
                    else:
                        nvae = NoViableAltException("", 2, 0, self.input)

                        raise nvae

                    if alt2 == 1:
                        # Groc.g:97:11: ( ordinals weekdays )
                        pass
                        # Groc.g:97:11: ( ordinals weekdays )
                        # Groc.g:97:12: ordinals weekdays
                        pass
                        self._state.following.append(self.FOLLOW_ordinals_in_specifictime72)
                        self.ordinals()

                        self._state.following.pop()
                        self._state.following.append(self.FOLLOW_weekdays_in_specifictime74)
                        self.weekdays()

                        self._state.following.pop()





                    elif alt2 == 2:
                        # Groc.g:97:31: monthdays
                        pass
                        self._state.following.append(self.FOLLOW_monthdays_in_specifictime77)
                        self.monthdays()

                        self._state.following.pop()



                    self.match(self.input, OF, self.FOLLOW_OF_in_specifictime80)
                    # Groc.g:97:45: ( monthspec | quarterspec )
                    alt3 = 2
                    LA3_0 = self.input.LA(1)

                    if ((MONTH <= LA3_0 <= DECEMBER)) :
                        alt3 = 1
                    elif ((FIRST <= LA3_0 <= THIRD) or LA3_0 == QUARTER) :
                        alt3 = 2
                    else:
                        nvae = NoViableAltException("", 3, 0, self.input)

                        raise nvae

                    if alt3 == 1:
                        # Groc.g:97:46: monthspec
                        pass
                        self._state.following.append(self.FOLLOW_monthspec_in_specifictime83)
                        self.monthspec()

                        self._state.following.pop()


                    elif alt3 == 2:
                        # Groc.g:97:56: quarterspec
                        pass
                        self._state.following.append(self.FOLLOW_quarterspec_in_specifictime85)
                        self.quarterspec()

                        self._state.following.pop()








                elif alt4 == 2:
                    # Groc.g:98:11: ( ordinals weekdays )
                    pass
                    # Groc.g:98:11: ( ordinals weekdays )
                    # Groc.g:98:12: ordinals weekdays
                    pass
                    self._state.following.append(self.FOLLOW_ordinals_in_specifictime101)
                    self.ordinals()

                    self._state.following.pop()
                    self._state.following.append(self.FOLLOW_weekdays_in_specifictime103)
                    self.weekdays()

                    self._state.following.pop()
                    #action start
                    self.month_set = set(range(1,13))
                    #action end






                TIME1=self.match(self.input, TIME, self.FOLLOW_TIME_in_specifictime117)
                #action start
                self.time_string = TIME1.text
                #action end







            except RecognitionException as re:
                self.reportError(re)
                self.recover(self.input, re)
        finally:

            pass

        return

    # $ANTLR end "specifictime"


    # $ANTLR start "interval"
    # Groc.g:102:1: interval : ( EVERY intervalnum= ( DIGIT | DIGITS ) period ( time_range | ( SYNCHRONIZED ) )? ( ON weekdays )? ) ;
    def interval(self, ):

        intervalnum = None
        period2 = None


        try:
            try:
                # Groc.g:103:3: ( ( EVERY intervalnum= ( DIGIT | DIGITS ) period ( time_range | ( SYNCHRONIZED ) )? ( ON weekdays )? ) )
                # Groc.g:103:5: ( EVERY intervalnum= ( DIGIT | DIGITS ) period ( time_range | ( SYNCHRONIZED ) )? ( ON weekdays )? )
                pass
                # Groc.g:103:5: ( EVERY intervalnum= ( DIGIT | DIGITS ) period ( time_range | ( SYNCHRONIZED ) )? ( ON weekdays )? )
                # Groc.g:103:7: EVERY intervalnum= ( DIGIT | DIGITS ) period ( time_range | ( SYNCHRONIZED ) )? ( ON weekdays )?
                pass
                self.match(self.input, EVERY, self.FOLLOW_EVERY_in_interval136)
                intervalnum = self.input.LT(1)
                if (DIGIT <= self.input.LA(1) <= DIGITS):
                    self.input.consume()
                    self._state.errorRecovery = False

                else:
                    mse = MismatchedSetException(None, self.input)
                    raise mse


                #action start

                self.interval_mins = int(intervalnum.text)

                #action end
                self._state.following.append(self.FOLLOW_period_in_interval164)
                period2 = self.period()

                self._state.following.pop()
                #action start

                if ((period2 is not None) and [self.input.toString(period2.start,period2.stop)] or [None])[0] == "hours":
                  self.period_string = "hours"
                else:
                  self.period_string = "minutes"

                #action end
                # Groc.g:113:7: ( time_range | ( SYNCHRONIZED ) )?
                alt5 = 3
                LA5_0 = self.input.LA(1)

                if (LA5_0 == FROM) :
                    alt5 = 1
                elif (LA5_0 == SYNCHRONIZED) :
                    alt5 = 2
                if alt5 == 1:
                    # Groc.g:113:9: time_range
                    pass
                    self._state.following.append(self.FOLLOW_time_range_in_interval176)
                    self.time_range()

                    self._state.following.pop()


                elif alt5 == 2:
                    # Groc.g:114:9: ( SYNCHRONIZED )
                    pass
                    # Groc.g:114:9: ( SYNCHRONIZED )
                    # Groc.g:114:10: SYNCHRONIZED
                    pass
                    self.match(self.input, SYNCHRONIZED, self.FOLLOW_SYNCHRONIZED_in_interval189)
                    #action start
                    self.synchronized = True
                    #action end






                # Groc.g:116:7: ( ON weekdays )?
                alt6 = 2
                LA6_0 = self.input.LA(1)

                if (LA6_0 == ON) :
                    alt6 = 1
                if alt6 == 1:
                    # Groc.g:116:9: ON weekdays
                    pass
                    self.match(self.input, ON, self.FOLLOW_ON_in_interval211)
                    self._state.following.append(self.FOLLOW_weekdays_in_interval213)
                    self.weekdays()

                    self._state.following.pop()










            except RecognitionException as re:
                self.reportError(re)
                self.recover(self.input, re)
        finally:

            pass

        return

    # $ANTLR end "interval"


    # $ANTLR start "ordinals"
    # Groc.g:119:1: ordinals : ( EVERY | ( ordinal ( COMMA ordinal )* ) ) ;
    def ordinals(self, ):

        try:
            try:
                # Groc.g:120:3: ( ( EVERY | ( ordinal ( COMMA ordinal )* ) ) )
                # Groc.g:120:5: ( EVERY | ( ordinal ( COMMA ordinal )* ) )
                pass
                # Groc.g:120:5: ( EVERY | ( ordinal ( COMMA ordinal )* ) )
                alt8 = 2
                LA8_0 = self.input.LA(1)

                if (LA8_0 == EVERY) :
                    alt8 = 1
                elif ((FIRST <= LA8_0 <= FOURTH_OR_FIFTH)) :
                    alt8 = 2
                else:
                    nvae = NoViableAltException("", 8, 0, self.input)

                    raise nvae

                if alt8 == 1:
                    # Groc.g:120:7: EVERY
                    pass
                    self.match(self.input, EVERY, self.FOLLOW_EVERY_in_ordinals233)


                elif alt8 == 2:
                    # Groc.g:121:5: ( ordinal ( COMMA ordinal )* )
                    pass
                    # Groc.g:121:5: ( ordinal ( COMMA ordinal )* )
                    # Groc.g:121:7: ordinal ( COMMA ordinal )*
                    pass
                    self._state.following.append(self.FOLLOW_ordinal_in_ordinals241)
                    self.ordinal()

                    self._state.following.pop()
                    # Groc.g:121:15: ( COMMA ordinal )*
                    while True: #loop7
                        alt7 = 2
                        LA7_0 = self.input.LA(1)

                        if (LA7_0 == COMMA) :
                            alt7 = 1


                        if alt7 == 1:
                            # Groc.g:121:16: COMMA ordinal
                            pass
                            self.match(self.input, COMMA, self.FOLLOW_COMMA_in_ordinals244)
                            self._state.following.append(self.FOLLOW_ordinal_in_ordinals246)
                            self.ordinal()

                            self._state.following.pop()


                        else:
                            break #loop7












            except RecognitionException as re:
                self.reportError(re)
                self.recover(self.input, re)
        finally:

            pass

        return

    # $ANTLR end "ordinals"


    # $ANTLR start "ordinal"
    # Groc.g:124:1: ordinal : ord= ( FIRST | SECOND | THIRD | FOURTH | FIFTH | FOURTH_OR_FIFTH ) ;
    def ordinal(self, ):

        ord = None

        try:
            try:
                # Groc.g:125:3: (ord= ( FIRST | SECOND | THIRD | FOURTH | FIFTH | FOURTH_OR_FIFTH ) )
                # Groc.g:125:5: ord= ( FIRST | SECOND | THIRD | FOURTH | FIFTH | FOURTH_OR_FIFTH )
                pass
                ord = self.input.LT(1)
                if (FIRST <= self.input.LA(1) <= FOURTH_OR_FIFTH):
                    self.input.consume()
                    self._state.errorRecovery = False

                else:
                    mse = MismatchedSetException(None, self.input)
                    raise mse


                #action start

                self.ordinal_set.add(self.ValueOf(ord.type));

                #action end




            except RecognitionException as re:
                self.reportError(re)
                self.recover(self.input, re)
        finally:

            pass

        return

    # $ANTLR end "ordinal"

    class period_return(ParserRuleReturnScope):
        def __init__(self):
            ParserRuleReturnScope.__init__(self)





    # $ANTLR start "period"
    # Groc.g:130:1: period : ( HOURS | MINUTES ) ;
    def period(self, ):

        retval = self.period_return()
        retval.start = self.input.LT(1)

        try:
            try:
                # Groc.g:131:3: ( ( HOURS | MINUTES ) )
                # Groc.g:131:5: ( HOURS | MINUTES )
                pass
                if (HOURS <= self.input.LA(1) <= MINUTES):
                    self.input.consume()
                    self._state.errorRecovery = False

                else:
                    mse = MismatchedSetException(None, self.input)
                    raise mse





                retval.stop = self.input.LT(-1)


            except RecognitionException as re:
                self.reportError(re)
                self.recover(self.input, re)
        finally:

            pass

        return retval

    # $ANTLR end "period"


    # $ANTLR start "monthdays"
    # Groc.g:134:1: monthdays : ( monthday ( COMMA monthday )* ) ;
    def monthdays(self, ):

        try:
            try:
                # Groc.g:135:3: ( ( monthday ( COMMA monthday )* ) )
                # Groc.g:135:5: ( monthday ( COMMA monthday )* )
                pass
                # Groc.g:135:5: ( monthday ( COMMA monthday )* )
                # Groc.g:135:7: monthday ( COMMA monthday )*
                pass
                self._state.following.append(self.FOLLOW_monthday_in_monthdays329)
                self.monthday()

                self._state.following.pop()
                # Groc.g:135:16: ( COMMA monthday )*
                while True: #loop9
                    alt9 = 2
                    LA9_0 = self.input.LA(1)

                    if (LA9_0 == COMMA) :
                        alt9 = 1


                    if alt9 == 1:
                        # Groc.g:135:18: COMMA monthday
                        pass
                        self.match(self.input, COMMA, self.FOLLOW_COMMA_in_monthdays333)
                        self._state.following.append(self.FOLLOW_monthday_in_monthdays335)
                        self.monthday()

                        self._state.following.pop()


                    else:
                        break #loop9









            except RecognitionException as re:
                self.reportError(re)
                self.recover(self.input, re)
        finally:

            pass

        return

    # $ANTLR end "monthdays"


    # $ANTLR start "monthday"
    # Groc.g:138:1: monthday : day= ( DIGIT | DIGITS ) ;
    def monthday(self, ):

        day = None

        try:
            try:
                # Groc.g:139:3: (day= ( DIGIT | DIGITS ) )
                # Groc.g:139:5: day= ( DIGIT | DIGITS )
                pass
                day = self.input.LT(1)
                if (DIGIT <= self.input.LA(1) <= DIGITS):
                    self.input.consume()
                    self._state.errorRecovery = False

                else:
                    mse = MismatchedSetException(None, self.input)
                    raise mse


                #action start

                self.monthday_set.add(int(day.text));
                #action end




            except RecognitionException as re:
                self.reportError(re)
                self.recover(self.input, re)
        finally:

            pass

        return

    # $ANTLR end "monthday"


    # $ANTLR start "weekdays"
    # Groc.g:143:1: weekdays : ( DAY | ( weekday ( COMMA weekday )* ) ) ;
    def weekdays(self, ):

        try:
            try:
                # Groc.g:144:3: ( ( DAY | ( weekday ( COMMA weekday )* ) ) )
                # Groc.g:144:5: ( DAY | ( weekday ( COMMA weekday )* ) )
                pass
                # Groc.g:144:5: ( DAY | ( weekday ( COMMA weekday )* ) )
                alt11 = 2
                LA11_0 = self.input.LA(1)

                if (LA11_0 == DAY) :
                    alt11 = 1
                elif ((MONDAY <= LA11_0 <= SUNDAY)) :
                    alt11 = 2
                else:
                    nvae = NoViableAltException("", 11, 0, self.input)

                    raise nvae

                if alt11 == 1:
                    # Groc.g:144:7: DAY
                    pass
                    self.match(self.input, DAY, self.FOLLOW_DAY_in_weekdays380)
                    #action start

                    if self.ordinal_set:
                      # <ordinal> day means <ordinal> day of the month,
                      # not every day of the <ordinal> week.
                      self.monthday_set = self.ordinal_set
                      self.ordinal_set = set()
                    else:
                      self.ordinal_set = self.ordinal_set.union(allOrdinals)
                      self.weekday_set = set([self.ValueOf(SUNDAY), self.ValueOf(MONDAY),
                              self.ValueOf(TUESDAY), self.ValueOf(WEDNESDAY),
                              self.ValueOf(THURSDAY), self.ValueOf(FRIDAY),
                              self.ValueOf(SATURDAY), self.ValueOf(SUNDAY)])

                    #action end


                elif alt11 == 2:
                    # Groc.g:156:11: ( weekday ( COMMA weekday )* )
                    pass
                    # Groc.g:156:11: ( weekday ( COMMA weekday )* )
                    # Groc.g:156:13: weekday ( COMMA weekday )*
                    pass
                    self._state.following.append(self.FOLLOW_weekday_in_weekdays388)
                    self.weekday()

                    self._state.following.pop()
                    # Groc.g:156:21: ( COMMA weekday )*
                    while True: #loop10
                        alt10 = 2
                        LA10_0 = self.input.LA(1)

                        if (LA10_0 == COMMA) :
                            alt10 = 1


                        if alt10 == 1:
                            # Groc.g:156:22: COMMA weekday
                            pass
                            self.match(self.input, COMMA, self.FOLLOW_COMMA_in_weekdays391)
                            self._state.following.append(self.FOLLOW_weekday_in_weekdays393)
                            self.weekday()

                            self._state.following.pop()


                        else:
                            break #loop10


                    #action start

                    if not self.ordinal_set:
                      self.ordinal_set = self.ordinal_set.union(allOrdinals)

                    #action end










            except RecognitionException as re:
                self.reportError(re)
                self.recover(self.input, re)
        finally:

            pass

        return

    # $ANTLR end "weekdays"


    # $ANTLR start "weekday"
    # Groc.g:162:1: weekday : dayname= ( MONDAY | TUESDAY | WEDNESDAY | THURSDAY | FRIDAY | SATURDAY | SUNDAY ) ;
    def weekday(self, ):

        dayname = None

        try:
            try:
                # Groc.g:163:3: (dayname= ( MONDAY | TUESDAY | WEDNESDAY | THURSDAY | FRIDAY | SATURDAY | SUNDAY ) )
                # Groc.g:163:5: dayname= ( MONDAY | TUESDAY | WEDNESDAY | THURSDAY | FRIDAY | SATURDAY | SUNDAY )
                pass
                dayname = self.input.LT(1)
                if (MONDAY <= self.input.LA(1) <= SUNDAY):
                    self.input.consume()
                    self._state.errorRecovery = False

                else:
                    mse = MismatchedSetException(None, self.input)
                    raise mse


                #action start

                self.weekday_set.add(self.ValueOf(dayname.type))

                #action end




            except RecognitionException as re:
                self.reportError(re)
                self.recover(self.input, re)
        finally:

            pass

        return

    # $ANTLR end "weekday"


    # $ANTLR start "monthspec"
    # Groc.g:169:1: monthspec : ( MONTH | months ) ;
    def monthspec(self, ):

        try:
            try:
                # Groc.g:170:3: ( ( MONTH | months ) )
                # Groc.g:170:5: ( MONTH | months )
                pass
                # Groc.g:170:5: ( MONTH | months )
                alt12 = 2
                LA12_0 = self.input.LA(1)

                if (LA12_0 == MONTH) :
                    alt12 = 1
                elif ((JANUARY <= LA12_0 <= DECEMBER)) :
                    alt12 = 2
                else:
                    nvae = NoViableAltException("", 12, 0, self.input)

                    raise nvae

                if alt12 == 1:
                    # Groc.g:170:7: MONTH
                    pass
                    self.match(self.input, MONTH, self.FOLLOW_MONTH_in_monthspec474)
                    #action start

                    self.month_set = self.month_set.union(set([
                        self.ValueOf(JANUARY), self.ValueOf(FEBRUARY), self.ValueOf(MARCH),
                        self.ValueOf(APRIL), self.ValueOf(MAY), self.ValueOf(JUNE),
                        self.ValueOf(JULY), self.ValueOf(AUGUST), self.ValueOf(SEPTEMBER),
                        self.ValueOf(OCTOBER), self.ValueOf(NOVEMBER),
                        self.ValueOf(DECEMBER)]))

                    #action end


                elif alt12 == 2:
                    # Groc.g:178:7: months
                    pass
                    self._state.following.append(self.FOLLOW_months_in_monthspec484)
                    self.months()

                    self._state.following.pop()







            except RecognitionException as re:
                self.reportError(re)
                self.recover(self.input, re)
        finally:

            pass

        return

    # $ANTLR end "monthspec"


    # $ANTLR start "months"
    # Groc.g:181:1: months : ( month ( COMMA month )* ) ;
    def months(self, ):

        try:
            try:
                # Groc.g:182:3: ( ( month ( COMMA month )* ) )
                # Groc.g:182:5: ( month ( COMMA month )* )
                pass
                # Groc.g:182:5: ( month ( COMMA month )* )
                # Groc.g:182:7: month ( COMMA month )*
                pass
                self._state.following.append(self.FOLLOW_month_in_months501)
                self.month()

                self._state.following.pop()
                # Groc.g:182:13: ( COMMA month )*
                while True: #loop13
                    alt13 = 2
                    LA13_0 = self.input.LA(1)

                    if (LA13_0 == COMMA) :
                        alt13 = 1


                    if alt13 == 1:
                        # Groc.g:182:14: COMMA month
                        pass
                        self.match(self.input, COMMA, self.FOLLOW_COMMA_in_months504)
                        self._state.following.append(self.FOLLOW_month_in_months506)
                        self.month()

                        self._state.following.pop()


                    else:
                        break #loop13









            except RecognitionException as re:
                self.reportError(re)
                self.recover(self.input, re)
        finally:

            pass

        return

    # $ANTLR end "months"


    # $ANTLR start "month"
    # Groc.g:185:1: month : monthname= ( JANUARY | FEBRUARY | MARCH | APRIL | MAY | JUNE | JULY | AUGUST | SEPTEMBER | OCTOBER | NOVEMBER | DECEMBER ) ;
    def month(self, ):

        monthname = None

        try:
            try:
                # Groc.g:186:3: (monthname= ( JANUARY | FEBRUARY | MARCH | APRIL | MAY | JUNE | JULY | AUGUST | SEPTEMBER | OCTOBER | NOVEMBER | DECEMBER ) )
                # Groc.g:186:5: monthname= ( JANUARY | FEBRUARY | MARCH | APRIL | MAY | JUNE | JULY | AUGUST | SEPTEMBER | OCTOBER | NOVEMBER | DECEMBER )
                pass
                monthname = self.input.LT(1)
                if (JANUARY <= self.input.LA(1) <= DECEMBER):
                    self.input.consume()
                    self._state.errorRecovery = False

                else:
                    mse = MismatchedSetException(None, self.input)
                    raise mse


                #action start
                self.month_set.add(self.ValueOf(monthname.type));
                #action end




            except RecognitionException as re:
                self.reportError(re)
                self.recover(self.input, re)
        finally:

            pass

        return

    # $ANTLR end "month"


    # $ANTLR start "quarterspec"
    # Groc.g:191:1: quarterspec : ( QUARTER | ( quarter_ordinals MONTH OF QUARTER ) ) ;
    def quarterspec(self, ):

        try:
            try:
                # Groc.g:192:3: ( ( QUARTER | ( quarter_ordinals MONTH OF QUARTER ) ) )
                # Groc.g:192:5: ( QUARTER | ( quarter_ordinals MONTH OF QUARTER ) )
                pass
                # Groc.g:192:5: ( QUARTER | ( quarter_ordinals MONTH OF QUARTER ) )
                alt14 = 2
                LA14_0 = self.input.LA(1)

                if (LA14_0 == QUARTER) :
                    alt14 = 1
                elif ((FIRST <= LA14_0 <= THIRD)) :
                    alt14 = 2
                else:
                    nvae = NoViableAltException("", 14, 0, self.input)

                    raise nvae

                if alt14 == 1:
                    # Groc.g:192:7: QUARTER
                    pass
                    self.match(self.input, QUARTER, self.FOLLOW_QUARTER_in_quarterspec598)
                    #action start

                    self.month_set = self.month_set.union(set([
                        self.ValueOf(JANUARY), self.ValueOf(APRIL), self.ValueOf(JULY),
                        self.ValueOf(OCTOBER)]))
                    #action end


                elif alt14 == 2:
                    # Groc.g:196:7: ( quarter_ordinals MONTH OF QUARTER )
                    pass
                    # Groc.g:196:7: ( quarter_ordinals MONTH OF QUARTER )
                    # Groc.g:196:9: quarter_ordinals MONTH OF QUARTER
                    pass
                    self._state.following.append(self.FOLLOW_quarter_ordinals_in_quarterspec610)
                    self.quarter_ordinals()

                    self._state.following.pop()
                    self.match(self.input, MONTH, self.FOLLOW_MONTH_in_quarterspec612)
                    self.match(self.input, OF, self.FOLLOW_OF_in_quarterspec614)
                    self.match(self.input, QUARTER, self.FOLLOW_QUARTER_in_quarterspec616)










            except RecognitionException as re:
                self.reportError(re)
                self.recover(self.input, re)
        finally:

            pass

        return

    # $ANTLR end "quarterspec"


    # $ANTLR start "quarter_ordinals"
    # Groc.g:199:1: quarter_ordinals : ( month_of_quarter_ordinal ( COMMA month_of_quarter_ordinal )* ) ;
    def quarter_ordinals(self, ):

        try:
            try:
                # Groc.g:200:3: ( ( month_of_quarter_ordinal ( COMMA month_of_quarter_ordinal )* ) )
                # Groc.g:200:5: ( month_of_quarter_ordinal ( COMMA month_of_quarter_ordinal )* )
                pass
                # Groc.g:200:5: ( month_of_quarter_ordinal ( COMMA month_of_quarter_ordinal )* )
                # Groc.g:200:7: month_of_quarter_ordinal ( COMMA month_of_quarter_ordinal )*
                pass
                self._state.following.append(self.FOLLOW_month_of_quarter_ordinal_in_quarter_ordinals635)
                self.month_of_quarter_ordinal()

                self._state.following.pop()
                # Groc.g:200:32: ( COMMA month_of_quarter_ordinal )*
                while True: #loop15
                    alt15 = 2
                    LA15_0 = self.input.LA(1)

                    if (LA15_0 == COMMA) :
                        alt15 = 1


                    if alt15 == 1:
                        # Groc.g:200:33: COMMA month_of_quarter_ordinal
                        pass
                        self.match(self.input, COMMA, self.FOLLOW_COMMA_in_quarter_ordinals638)
                        self._state.following.append(self.FOLLOW_month_of_quarter_ordinal_in_quarter_ordinals640)
                        self.month_of_quarter_ordinal()

                        self._state.following.pop()


                    else:
                        break #loop15









            except RecognitionException as re:
                self.reportError(re)
                self.recover(self.input, re)
        finally:

            pass

        return

    # $ANTLR end "quarter_ordinals"


    # $ANTLR start "month_of_quarter_ordinal"
    # Groc.g:203:1: month_of_quarter_ordinal : offset= ( FIRST | SECOND | THIRD ) ;
    def month_of_quarter_ordinal(self, ):

        offset = None

        try:
            try:
                # Groc.g:204:3: (offset= ( FIRST | SECOND | THIRD ) )
                # Groc.g:204:5: offset= ( FIRST | SECOND | THIRD )
                pass
                offset = self.input.LT(1)
                if (FIRST <= self.input.LA(1) <= THIRD):
                    self.input.consume()
                    self._state.errorRecovery = False

                else:
                    mse = MismatchedSetException(None, self.input)
                    raise mse


                #action start

                jOffset = self.ValueOf(offset.type) - 1
                self.month_set = self.month_set.union(set([
                    jOffset + self.ValueOf(JANUARY), jOffset + self.ValueOf(APRIL),
                    jOffset + self.ValueOf(JULY), jOffset + self.ValueOf(OCTOBER)]))
                #action end




            except RecognitionException as re:
                self.reportError(re)
                self.recover(self.input, re)
        finally:

            pass

        return

    # $ANTLR end "month_of_quarter_ordinal"


    # $ANTLR start "time_range"
    # Groc.g:211:1: time_range : ( FROM (start_time= TIME ) TO (end_time= TIME ) ) ;
    def time_range(self, ):

        start_time = None
        end_time = None

        try:
            try:
                # Groc.g:212:3: ( ( FROM (start_time= TIME ) TO (end_time= TIME ) ) )
                # Groc.g:212:5: ( FROM (start_time= TIME ) TO (end_time= TIME ) )
                pass
                # Groc.g:212:5: ( FROM (start_time= TIME ) TO (end_time= TIME ) )
                # Groc.g:212:7: FROM (start_time= TIME ) TO (end_time= TIME )
                pass
                self.match(self.input, FROM, self.FOLLOW_FROM_in_time_range688)
                # Groc.g:212:12: (start_time= TIME )
                # Groc.g:212:13: start_time= TIME
                pass
                start_time=self.match(self.input, TIME, self.FOLLOW_TIME_in_time_range695)
                #action start
                self.start_time_string = start_time.text
                #action end



                self.match(self.input, TO, self.FOLLOW_TO_in_time_range706)
                # Groc.g:213:10: (end_time= TIME )
                # Groc.g:213:11: end_time= TIME
                pass
                end_time=self.match(self.input, TIME, self.FOLLOW_TIME_in_time_range713)
                #action start
                self.end_time_string = end_time.text
                #action end










            except RecognitionException as re:
                self.reportError(re)
                self.recover(self.input, re)
        finally:

            pass

        return

    # $ANTLR end "time_range"


    # Delegated rules


    # lookup tables for DFA #4

    DFA4_eot = DFA.unpack(
        u"\13\uffff"
        )

    DFA4_eof = DFA.unpack(
        u"\13\uffff"
        )

    DFA4_min = DFA.unpack(
        u"\1\6\1\24\1\13\1\uffff\2\4\1\14\1\uffff\1\25\1\13\1\4"
        )

    DFA4_max = DFA.unpack(
        u"\1\21\2\33\1\uffff\1\5\1\13\1\21\1\uffff\2\33\1\13"
        )

    DFA4_accept = DFA.unpack(
        u"\3\uffff\1\1\3\uffff\1\2\3\uffff"
        )

    DFA4_special = DFA.unpack(
        u"\13\uffff"
        )


    DFA4_transition = [
        DFA.unpack(u"\1\1\2\3\3\uffff\6\2"),
        DFA.unpack(u"\1\4\7\5"),
        DFA.unpack(u"\1\6\10\uffff\1\4\7\5"),
        DFA.unpack(u""),
        DFA.unpack(u"\1\3\1\7"),
        DFA.unpack(u"\1\3\1\7\5\uffff\1\10"),
        DFA.unpack(u"\6\11"),
        DFA.unpack(u""),
        DFA.unpack(u"\7\12"),
        DFA.unpack(u"\1\6\10\uffff\1\4\7\5"),
        DFA.unpack(u"\1\3\1\7\5\uffff\1\10")
    ]

    # class definition for DFA #4

    DFA4 = DFA


    FOLLOW_specifictime_in_timespec44 = frozenset([])
    FOLLOW_interval_in_timespec48 = frozenset([])
    FOLLOW_EOF_in_timespec52 = frozenset([1])
    FOLLOW_ordinals_in_specifictime72 = frozenset([20, 21, 22, 23, 24, 25, 26, 27])
    FOLLOW_weekdays_in_specifictime74 = frozenset([4])
    FOLLOW_monthdays_in_specifictime77 = frozenset([4])
    FOLLOW_OF_in_specifictime80 = frozenset([12, 13, 14, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41])
    FOLLOW_monthspec_in_specifictime83 = frozenset([5])
    FOLLOW_quarterspec_in_specifictime85 = frozenset([5])
    FOLLOW_ordinals_in_specifictime101 = frozenset([20, 21, 22, 23, 24, 25, 26, 27])
    FOLLOW_weekdays_in_specifictime103 = frozenset([5])
    FOLLOW_TIME_in_specifictime117 = frozenset([1])
    FOLLOW_EVERY_in_interval136 = frozenset([7, 8])
    FOLLOW_set_in_interval146 = frozenset([18, 19])
    FOLLOW_period_in_interval164 = frozenset([1, 9, 10, 42])
    FOLLOW_time_range_in_interval176 = frozenset([1, 10])
    FOLLOW_SYNCHRONIZED_in_interval189 = frozenset([1, 10])
    FOLLOW_ON_in_interval211 = frozenset([20, 21, 22, 23, 24, 25, 26, 27])
    FOLLOW_weekdays_in_interval213 = frozenset([1])
    FOLLOW_EVERY_in_ordinals233 = frozenset([1])
    FOLLOW_ordinal_in_ordinals241 = frozenset([1, 11])
    FOLLOW_COMMA_in_ordinals244 = frozenset([12, 13, 14, 15, 16, 17])
    FOLLOW_ordinal_in_ordinals246 = frozenset([1, 11])
    FOLLOW_set_in_ordinal267 = frozenset([1])
    FOLLOW_set_in_period306 = frozenset([1])
    FOLLOW_monthday_in_monthdays329 = frozenset([1, 11])
    FOLLOW_COMMA_in_monthdays333 = frozenset([7, 8])
    FOLLOW_monthday_in_monthdays335 = frozenset([1, 11])
    FOLLOW_set_in_monthday355 = frozenset([1])
    FOLLOW_DAY_in_weekdays380 = frozenset([1])
    FOLLOW_weekday_in_weekdays388 = frozenset([1, 11])
    FOLLOW_COMMA_in_weekdays391 = frozenset([20, 21, 22, 23, 24, 25, 26, 27])
    FOLLOW_weekday_in_weekdays393 = frozenset([1, 11])
    FOLLOW_set_in_weekday415 = frozenset([1])
    FOLLOW_MONTH_in_monthspec474 = frozenset([1])
    FOLLOW_months_in_monthspec484 = frozenset([1])
    FOLLOW_month_in_months501 = frozenset([1, 11])
    FOLLOW_COMMA_in_months504 = frozenset([28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40])
    FOLLOW_month_in_months506 = frozenset([1, 11])
    FOLLOW_set_in_month525 = frozenset([1])
    FOLLOW_QUARTER_in_quarterspec598 = frozenset([1])
    FOLLOW_quarter_ordinals_in_quarterspec610 = frozenset([28])
    FOLLOW_MONTH_in_quarterspec612 = frozenset([4])
    FOLLOW_OF_in_quarterspec614 = frozenset([41])
    FOLLOW_QUARTER_in_quarterspec616 = frozenset([1])
    FOLLOW_month_of_quarter_ordinal_in_quarter_ordinals635 = frozenset([1, 11])
    FOLLOW_COMMA_in_quarter_ordinals638 = frozenset([12, 13, 14, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41])
    FOLLOW_month_of_quarter_ordinal_in_quarter_ordinals640 = frozenset([1, 11])
    FOLLOW_set_in_month_of_quarter_ordinal659 = frozenset([1])
    FOLLOW_FROM_in_time_range688 = frozenset([5])
    FOLLOW_TIME_in_time_range695 = frozenset([43])
    FOLLOW_TO_in_time_range706 = frozenset([5])
    FOLLOW_TIME_in_time_range713 = frozenset([1])



def main(argv, stdin=sys.stdin, stdout=sys.stdout, stderr=sys.stderr):
    from antlr3.main import ParserMain
    main = ParserMain("GrocLexer", GrocParser)
    main.stdin = stdin
    main.stdout = stdout
    main.stderr = stderr
    main.execute(argv)


if __name__ == '__main__':
    main(sys.argv)
