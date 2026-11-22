import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Modal,
  Pressable,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
  KeyboardAvoidingView,
  Platform,
  Share,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

// Adjust this path to where you saved communityService.js
import {
  fetchQuestions,
  fetchQuestion,
  askQuestion,
  answerQuestion,
  toggleHelpful,
  toggleAnswerLike,
} from "../../service/communityService";

const COLORS = {
  navy: "#123D83",
  blue: "#087BC1",
  green: "#A5C83C",
  orange: "#F58220",
  dark: "#17213B",
  text: "#153B59",
  border: "#D5E0EC",
  placeholder: "#929EAB",
  muted: "#738194",
  background: "#F7FAFE",
  white: "#FFFFFF",
};

// Keep in sync with CATEGORIES in backend/models/community/CommunityQuestion.js
const CATEGORIES = [
  "General Surgery",
  "Orthopedics",
  "Cardiology",
  "Ophthalmology",
  "Gynecology",
  "Urology",
  "Insurance",
  "Medical Loan",
  "Other",
];

/* ------------------------------ helpers ------------------------------ */

const formatDate = (d) =>
  new Date(d).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

const timeAgo = (d) => {
  const seconds = Math.floor((Date.now() - new Date(d).getTime()) / 1000);
  if (seconds < 60) return "Just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} min ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hr ago`;
  const days = Math.floor(hours / 24);
  if (days === 1) return "Yesterday";
  if (days < 7) return `${days} days ago`;
  return formatDate(d);
};

const initials = (name = "G", expert = false) => {
  const words = name.trim().split(/\s+/).filter(Boolean);
  if (!words.length) return "G";
  if (!expert) return words[0][0].toUpperCase();
  return words
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
};

const errorMessage = (err, fallback) =>
  err?.response?.data?.message || fallback;

/* --------------------------- small components --------------------------- */

const Avatar = ({ name, expert }) => (
  <View
    className="w-11 h-11 rounded-full items-center justify-center"
    style={{ backgroundColor: expert ? COLORS.navy : "#EEF5D6" }}
  >
    <Text
      className="text-[15px] font-extrabold"
      style={{ color: expert ? COLORS.white : COLORS.navy }}
    >
      {initials(name, expert)}
    </Text>
  </View>
);

const Sheet = ({ visible, title, onClose, children }) => (
  <Modal
    visible={visible}
    transparent
    animationType="slide"
    onRequestClose={onClose}
  >
    <KeyboardAvoidingView
      className="flex-1"
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <Pressable
        className="flex-1 justify-end"
        style={{ backgroundColor: "rgba(18,61,131,0.4)" }}
        onPress={onClose}
      >
        <Pressable
          className="bg-white rounded-t-[28px] px-5 pt-5 pb-8"
          style={{ maxHeight: "88%" }}
          onPress={(event) => event.stopPropagation()}
        >
          <View className="items-center mb-4">
            <View className="w-12 h-1 rounded-full bg-gray-300" />
          </View>

          <View className="flex-row justify-between items-center mb-4">
            <Text
              className="text-[19px] font-extrabold"
              style={{ color: COLORS.navy }}
            >
              {title}
            </Text>

            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close-circle" size={26} color="#8A98A8" />
            </TouchableOpacity>
          </View>

          {children}
        </Pressable>
      </Pressable>
    </KeyboardAvoidingView>
  </Modal>
);

const Chip = ({ label, selected, onPress }) => (
  <TouchableOpacity
    activeOpacity={0.8}
    onPress={onPress}
    className="px-4 py-2 rounded-full mr-2 mb-2"
    style={{
      backgroundColor: selected ? COLORS.blue : "#F8FAFC",
      borderWidth: 1,
      borderColor: selected ? COLORS.blue : COLORS.border,
    }}
  >
    <Text
      className="text-[13px] font-semibold"
      style={{ color: selected ? COLORS.white : COLORS.text }}
    >
      {label}
    </Text>
  </TouchableOpacity>
);

const PrimaryButton = ({ label, onPress, busy }) => (
  <TouchableOpacity
    activeOpacity={0.85}
    onPress={onPress}
    disabled={busy}
    className="h-[50px] rounded-full items-center justify-center mt-2"
    style={{ backgroundColor: COLORS.blue, opacity: busy ? 0.7 : 1 }}
  >
    {busy ? (
      <ActivityIndicator color="#FFFFFF" />
    ) : (
      <Text className="text-white text-[15px] font-extrabold">{label}</Text>
    )}
  </TouchableOpacity>
);

const FieldLabel = ({ children }) => (
  <Text
    className="text-[13px] font-bold mb-2 mt-3"
    style={{ color: COLORS.text }}
  >
    {children}
  </Text>
);

const InlineError = ({ message }) =>
  message ? (
    <View className="flex-row items-center bg-red-50 p-3 rounded-xl mt-3">
      <Ionicons name="alert-circle" size={18} color="#DC2626" />
      <Text className="text-red-600 text-[12px] ml-2 flex-1">{message}</Text>
    </View>
  ) : null;

/* ------------------------------- answers ------------------------------- */

const AnswerItem = ({ answer, onLike }) => {
  const [open, setOpen] = useState(false);
  const isLong = answer.text.length > 140;
  const likeColor = answer.isLiked ? COLORS.blue : "#8A98A8";

  return (
    <View
      className="rounded-2xl p-4 mt-3"
      style={{ backgroundColor: answer.isExpert ? "#EAF4FF" : "#F8FAFC" }}
    >
      <View className="flex-row items-center">
        <Avatar name={answer.authorName} expert={answer.isExpert} />

        <View className="ml-3 flex-1">
          <Text
            className="text-[15px] font-bold"
            style={{ color: COLORS.dark }}
          >
            {answer.authorName}
          </Text>

          {answer.isExpert && (
            <View
              className="self-start mt-1 px-2 py-[2px] rounded"
              style={{ backgroundColor: COLORS.green }}
            >
              <Text
                className="text-[10px] font-extrabold"
                style={{ color: COLORS.dark }}
              >
                EXPERT ANSWER
              </Text>
            </View>
          )}
        </View>
      </View>

      <Text
        numberOfLines={open ? undefined : 3}
        className="text-[14px] leading-[21px] mt-3"
        style={{ color: COLORS.text }}
      >
        {answer.text}
      </Text>

      {isLong && (
        <TouchableOpacity
          onPress={() => setOpen((o) => !o)}
          className="self-end mt-1"
        >
          <Text
            className="text-[13px] font-semibold"
            style={{ color: COLORS.blue }}
          >
            {open ? "Show less" : "Read more"}
          </Text>
        </TouchableOpacity>
      )}

      <View className="flex-row items-center justify-between mt-3">
        <TouchableOpacity
          onPress={onLike}
          activeOpacity={0.7}
          className="flex-row items-center"
        >
          <Ionicons
            name={answer.isLiked ? "thumbs-up" : "thumbs-up-outline"}
            size={18}
            color={likeColor}
          />
          <Text className="ml-2 text-[13px]" style={{ color: likeColor }}>
            {answer.likeCount > 0 ? `Like (${answer.likeCount})` : "Like"}
          </Text>
        </TouchableOpacity>

        <Text className="text-[12px]" style={{ color: "#8A98A8" }}>
          {timeAgo(answer.createdAt)}
        </Text>
      </View>
    </View>
  );
};

/* ------------------------------- question ------------------------------- */

const QuestionCard = ({
  item,
  loadingAll,
  onHelpful,
  onAnswer,
  onShare,
  onLikeAnswer,
  onViewAll,
}) => {
  const hiddenAnswers = item.answerCount - item.answers.length;

  return (
    <View
      className="bg-white rounded-[22px] p-4 mb-4"
      style={{
        borderWidth: 1,
        borderColor: COLORS.border,
        shadowColor: COLORS.navy,
        shadowOpacity: 0.05,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 2 },
        elevation: 1,
      }}
    >
      {/* Author */}
      <View className="flex-row items-center">
        <Avatar name={item.authorName} />
        <Text
          className="ml-3 text-[16px] font-bold flex-1"
          style={{ color: COLORS.dark }}
        >
          {item.isMine ? `${item.authorName} (You)` : item.authorName}
        </Text>

        {item.status === "pending" && (
          <View
            className="px-2 py-1 rounded-full"
            style={{ backgroundColor: `${COLORS.orange}22` }}
          >
            <Text
              className="text-[10px] font-bold"
              style={{ color: COLORS.orange }}
            >
              IN REVIEW
            </Text>
          </View>
        )}
      </View>

      <Text className="text-[12.5px] mt-3" style={{ color: COLORS.muted }}>
        Posted under{" "}
        <Text style={{ color: COLORS.blue, fontWeight: "600" }}>
          {item.category}
        </Text>{" "}
        on {formatDate(item.createdAt)}
      </Text>

      <Text
        className="text-[17px] font-bold leading-[24px] mt-3"
        style={{ color: COLORS.dark }}
      >
        {item.question}
      </Text>

      {/* Answer button */}
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onAnswer}
        className="h-[46px] rounded-full flex-row items-center justify-center mt-4"
        style={{ borderWidth: 1.5, borderColor: COLORS.blue }}
      >
        <Ionicons name="chatbubble-ellipses-outline" size={19} color={COLORS.blue} />
        <Text
          className="ml-2 text-[14px] font-bold"
          style={{ color: COLORS.blue }}
        >
          Answer this question
        </Text>
      </TouchableOpacity>

      {/* Helpful / Share */}
      <View
        className="flex-row items-center mt-4"
        style={{
          borderTopWidth: 1,
          borderBottomWidth: 1,
          borderColor: "#EDF1F6",
        }}
      >
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={onHelpful}
          className="flex-1 flex-row items-center justify-center py-3"
        >
          <Ionicons
            name={item.isHelpful ? "heart" : "heart-outline"}
            size={22}
            color={item.isHelpful ? COLORS.orange : COLORS.blue}
          />
          <Text
            className="ml-2 text-[14px] font-semibold"
            style={{ color: COLORS.dark }}
          >
            Helpful{item.helpfulCount > 0 ? ` (${item.helpfulCount})` : ""}
          </Text>
        </TouchableOpacity>

        <View style={{ width: 1, height: 28, backgroundColor: "#EDF1F6" }} />

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={onShare}
          className="flex-1 flex-row items-center justify-center py-3"
        >
          <Ionicons name="share-social-outline" size={22} color={COLORS.blue} />
          <Text
            className="ml-2 text-[14px] font-semibold"
            style={{ color: COLORS.dark }}
          >
            Share
          </Text>
        </TouchableOpacity>
      </View>

      {/* Answers */}
      <Text
        className="text-[15px] font-extrabold mt-4"
        style={{ color: COLORS.dark }}
      >
        {item.answerCount > 0
          ? `Answers (${item.answerCount})`
          : "No answers yet"}
      </Text>

      {item.answerCount === 0 && (
        <Text className="text-[13px] mt-1" style={{ color: COLORS.muted }}>
          Be the first to help with this question.
        </Text>
      )}

      {item.answers.map((answer) => (
        <AnswerItem
          key={answer.id}
          answer={answer}
          onLike={() => onLikeAnswer(answer.id)}
        />
      ))}

      {hiddenAnswers > 0 && (
        <TouchableOpacity
          onPress={onViewAll}
          disabled={loadingAll}
          className="self-center mt-4 flex-row items-center"
        >
          {loadingAll ? (
            <ActivityIndicator color={COLORS.blue} />
          ) : (
            <Text
              className="text-[14px] font-bold"
              style={{ color: COLORS.blue }}
            >
              View all answers ({item.answerCount})
            </Text>
          )}
        </TouchableOpacity>
      )}
    </View>
  );
};

/* -------------------------------- screen -------------------------------- */

const CommunityScreen = () => {
  const [tab, setTab] = useState("feed"); // "feed" | "mine"
  const [category, setCategory] = useState("All");

  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState("");
  const [banner, setBanner] = useState("");
  const [loadingAllId, setLoadingAllId] = useState(null);

  // Modals
  const [filterOpen, setFilterOpen] = useState(false);

  const [askOpen, setAskOpen] = useState(false);
  const [askCategory, setAskCategory] = useState("");
  const [askName, setAskName] = useState("");
  const [askText, setAskText] = useState("");
  const [askError, setAskError] = useState("");
  const [askBusy, setAskBusy] = useState(false);

  const [answerTarget, setAnswerTarget] = useState(null);
  const [answerText, setAnswerText] = useState("");
  const [answerName, setAnswerName] = useState("");
  const [answerError, setAnswerError] = useState("");
  const [answerBusy, setAnswerBusy] = useState(false);

  /* ----------------------------- data loading ----------------------------- */

  const loadPage = async (nextPage, mode) => {
    try {
      if (mode === "initial") setLoading(true);
      if (mode === "more") setLoadingMore(true);
      setError("");

      const res = await fetchQuestions({ tab, category, page: nextPage });

      setItems((prev) => (nextPage === 1 ? res.data : [...prev, ...res.data]));
      setPage(nextPage);
      setHasMore(res.pagination.page < res.pagination.pages);
    } catch (err) {
      setError(errorMessage(err, "Unable to load questions. Please try again."));
    } finally {
      setLoading(false);
      setRefreshing(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    loadPage(1, "initial");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab, category]);

  const showBanner = (message) => {
    setBanner(message);
    setTimeout(() => setBanner(""), 3500);
  };

  const replaceItem = (updated) =>
    setItems((prev) => prev.map((i) => (i.id === updated.id ? updated : i)));

  /* ------------------------------- actions ------------------------------- */

  const handleHelpful = async (item) => {
    try {
      const res = await toggleHelpful(item.id);
      setItems((prev) =>
        prev.map((i) =>
          i.id === item.id
            ? {
                ...i,
                helpfulCount: res.data.helpfulCount,
                isHelpful: res.data.isHelpful,
              }
            : i
        )
      );
    } catch (err) {
      showBanner(errorMessage(err, "Could not update. Please try again."));
    }
  };

  const handleLikeAnswer = async (item, answerId) => {
    try {
      const res = await toggleAnswerLike(item.id, answerId);
      const fresh = res.data.answers.find((a) => a.id === answerId);
      if (!fresh) return;

      setItems((prev) =>
        prev.map((i) =>
          i.id === item.id
            ? {
                ...i,
                answers: i.answers.map((a) => (a.id === answerId ? fresh : a)),
              }
            : i
        )
      );
    } catch (err) {
      showBanner(errorMessage(err, "Could not update. Please try again."));
    }
  };

  const handleViewAll = async (item) => {
    try {
      setLoadingAllId(item.id);
      const res = await fetchQuestion(item.id);
      replaceItem(res.data);
    } catch (err) {
      showBanner(errorMessage(err, "Unable to load answers."));
    } finally {
      setLoadingAllId(null);
    }
  };

  const handleShare = async (item) => {
    try {
      await Share.share({
        message: `${item.question}\n\nAsked in the O Positive Health community.`,
      });
    } catch (e) {
      // user dismissed the share sheet
    }
  };

  /* --------------------------- ask / answer forms --------------------------- */

  const openAsk = () => {
    setAskError("");
    setAskOpen(true);
  };

  const submitQuestion = async () => {
    if (askBusy) return;

    if (!askCategory) return setAskError("Please select a category.");
    if (askText.trim().length < 10)
      return setAskError("Please write at least 10 characters.");

    setAskError("");
    setAskBusy(true);

    try {
      const res = await askQuestion({
        category: askCategory,
        question: askText.trim(),
        authorName: askName.trim(),
      });

      const created = res.data;
      const matchesFilter = category === "All" || category === created.category;
      const visible = created.status === "approved" || tab === "mine";

      if (matchesFilter && visible) setItems((prev) => [created, ...prev]);

      setAskText("");
      setAskCategory("");
      setAskOpen(false);
      showBanner(res.message || "Your question has been posted.");
    } catch (err) {
      setAskError(errorMessage(err, "Unable to post. Please try again."));
    } finally {
      setAskBusy(false);
    }
  };

  const openAnswer = (item) => {
    setAnswerError("");
    setAnswerText("");
    setAnswerTarget(item);
  };

  const submitAnswer = async () => {
    if (answerBusy || !answerTarget) return;

    if (answerText.trim().length < 5)
      return setAnswerError("Please write at least 5 characters.");

    setAnswerError("");
    setAnswerBusy(true);

    try {
      const res = await answerQuestion(answerTarget.id, {
        text: answerText.trim(),
        authorName: answerName.trim(),
      });

      replaceItem(res.data);
      setAnswerTarget(null);
      setAnswerText("");
      showBanner("Your answer has been posted.");
    } catch (err) {
      setAnswerError(errorMessage(err, "Unable to post. Please try again."));
    } finally {
      setAnswerBusy(false);
    }
  };

  /* -------------------------------- render -------------------------------- */

  const renderEmpty = () => {
    if (loading) {
      return (
        <View className="items-center py-16">
          <ActivityIndicator size="large" color={COLORS.blue} />
        </View>
      );
    }

    if (error) {
      return (
        <View className="items-center py-14 px-6">
          <Ionicons name="cloud-offline-outline" size={44} color="#B5C0CC" />
          <Text
            className="text-[14px] text-center mt-3"
            style={{ color: COLORS.muted }}
          >
            {error}
          </Text>
          <TouchableOpacity
            onPress={() => loadPage(1, "initial")}
            className="mt-4 px-6 py-3 rounded-full"
            style={{ backgroundColor: COLORS.blue }}
          >
            <Text className="text-white font-bold text-[14px]">Try again</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <View className="items-center py-14 px-6">
        <Ionicons name="chatbubbles-outline" size={48} color="#B5C0CC" />
        <Text
          className="text-[16px] font-bold mt-3"
          style={{ color: COLORS.dark }}
        >
          {tab === "mine" ? "You have not asked anything yet" : "No questions yet"}
        </Text>
        <Text
          className="text-[13px] text-center mt-1"
          style={{ color: COLORS.muted }}
        >
          Tap "Ask Question" to start the conversation.
        </Text>
      </View>
    );
  };

  return (
    <View className="flex-1" style={{ backgroundColor: COLORS.background }}>
      {/* Header */}
      <View className="px-5 pt-3 pb-2 bg-white">
        <Text
          className="text-[25px] font-extrabold"
          style={{ color: COLORS.dark }}
        >
          Community
        </Text>
        <View
          className="w-14 h-1 rounded-full mt-2"
          style={{ backgroundColor: COLORS.orange }}
        />
        <Text className="text-[13px] mt-2" style={{ color: COLORS.muted }}>
          Ask health questions and get answers from our experts and community.
        </Text>
      </View>

      {/* Tabs + filter */}
      <View className="flex-row items-center justify-between px-4 py-3">
        <View className="flex-row">
          {[
            ["feed", "Feed"],
            ["mine", "My questions"],
          ].map(([key, label]) => {
            const active = tab === key;
            return (
              <TouchableOpacity
                key={key}
                activeOpacity={0.8}
                onPress={() => setTab(key)}
                className="px-5 py-3 rounded-full mr-2"
                style={{
                  backgroundColor: active ? COLORS.blue : COLORS.white,
                  borderWidth: 1,
                  borderColor: active ? COLORS.blue : COLORS.border,
                }}
              >
                <Text
                  className="text-[14px] font-bold"
                  style={{ color: active ? COLORS.white : COLORS.muted }}
                >
                  {label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <TouchableOpacity
          onPress={() => setFilterOpen(true)}
          className="w-11 h-11 items-center justify-center"
        >
          <Ionicons name="options-outline" size={26} color={COLORS.blue} />
          {category !== "All" && (
            <View
              className="absolute top-1 right-1 w-3 h-3 rounded-full"
              style={{ backgroundColor: COLORS.orange }}
            />
          )}
        </TouchableOpacity>
      </View>

      {category !== "All" && (
        <View className="px-4 pb-2 flex-row items-center">
          <View
            className="flex-row items-center px-3 py-1 rounded-full"
            style={{ backgroundColor: "#EAF4FF" }}
          >
            <Text
              className="text-[12px] font-semibold"
              style={{ color: COLORS.navy }}
            >
              {category}
            </Text>
            <TouchableOpacity onPress={() => setCategory("All")}>
              <Ionicons
                name="close"
                size={16}
                color={COLORS.navy}
                style={{ marginLeft: 6 }}
              />
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Banner */}
      {!!banner && (
        <View
          className="mx-4 mb-2 flex-row items-center p-3 rounded-xl"
          style={{ backgroundColor: "#EAF4FF" }}
        >
          <Ionicons name="information-circle" size={18} color={COLORS.blue} />
          <Text
            className="text-[12px] font-medium ml-2 flex-1"
            style={{ color: COLORS.navy }}
          >
            {banner}
          </Text>
        </View>
      )}

      {/* Feed */}
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingTop: 4,
          paddingBottom: 120,
          flexGrow: 1,
        }}
        ListEmptyComponent={renderEmpty}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => {
              setRefreshing(true);
              loadPage(1, "refresh");
            }}
            tintColor={COLORS.blue}
            colors={[COLORS.blue]}
          />
        }
        onEndReachedThreshold={0.4}
        onEndReached={() => {
          if (hasMore && !loadingMore && !loading) loadPage(page + 1, "more");
        }}
        ListFooterComponent={
          loadingMore ? (
            <ActivityIndicator className="py-4" color={COLORS.blue} />
          ) : null
        }
        renderItem={({ item }) => (
          <QuestionCard
            item={item}
            loadingAll={loadingAllId === item.id}
            onHelpful={() => handleHelpful(item)}
            onAnswer={() => openAnswer(item)}
            onShare={() => handleShare(item)}
            onLikeAnswer={(answerId) => handleLikeAnswer(item, answerId)}
            onViewAll={() => handleViewAll(item)}
          />
        )}
      />

      {/* Floating Ask button */}
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={openAsk}
        className="absolute right-4 bottom-6 h-[54px] px-6 rounded-full flex-row items-center"
        style={{
          backgroundColor: COLORS.blue,
          elevation: 5,
          shadowColor: COLORS.navy,
          shadowOpacity: 0.25,
          shadowRadius: 8,
          shadowOffset: { width: 0, height: 4 },
        }}
      >
        <Ionicons name="add" size={24} color="#FFFFFF" />
        <Text className="text-white text-[16px] font-extrabold ml-1">
          Ask Question
        </Text>
      </TouchableOpacity>

      {/* Filter sheet */}
      <Sheet
        visible={filterOpen}
        title="Filter by category"
        onClose={() => setFilterOpen(false)}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <View className="flex-row flex-wrap">
            {["All", ...CATEGORIES].map((c) => (
              <Chip
                key={c}
                label={c}
                selected={category === c}
                onPress={() => {
                  setCategory(c);
                  setFilterOpen(false);
                }}
              />
            ))}
          </View>
        </ScrollView>
      </Sheet>

      {/* Ask sheet */}
      <Sheet
        visible={askOpen}
        title="Ask a question"
        onClose={() => setAskOpen(false)}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <FieldLabel>
            Category <Text style={{ color: COLORS.orange }}>*</Text>
          </FieldLabel>
          <View className="flex-row flex-wrap">
            {CATEGORIES.map((c) => (
              <Chip
                key={c}
                label={c}
                selected={askCategory === c}
                onPress={() => setAskCategory(c)}
              />
            ))}
          </View>

          <FieldLabel>Your name (optional)</FieldLabel>
          <TextInput
            value={askName}
            onChangeText={setAskName}
            placeholder="Guest"
            placeholderTextColor={COLORS.placeholder}
            maxLength={60}
            className="h-[50px] rounded-2xl px-4 text-[14px] font-medium bg-white"
            style={{
              borderWidth: 1,
              borderColor: askName ? COLORS.blue : COLORS.border,
              color: COLORS.dark,
            }}
          />

          <FieldLabel>
            Your question <Text style={{ color: COLORS.orange }}>*</Text>
          </FieldLabel>
          <TextInput
            value={askText}
            onChangeText={setAskText}
            placeholder="Type your health question here..."
            placeholderTextColor={COLORS.placeholder}
            multiline
            maxLength={500}
            textAlignVertical="top"
            className="rounded-2xl px-4 py-3 text-[14px] font-medium bg-white"
            style={{
              minHeight: 110,
              borderWidth: 1,
              borderColor: askText ? COLORS.blue : COLORS.border,
              color: COLORS.dark,
            }}
          />
          <Text
            className="text-[11px] text-right mt-1"
            style={{ color: COLORS.muted }}
          >
            {askText.length}/500
          </Text>

          <Text className="text-[11.5px] mt-2" style={{ color: COLORS.muted }}>
            Answers here are for general information and are not a medical
            diagnosis. Please do not share phone numbers or other personal
            details.
          </Text>

          <InlineError message={askError} />

          <PrimaryButton
            label="Post question"
            onPress={submitQuestion}
            busy={askBusy}
          />
        </ScrollView>
      </Sheet>

      {/* Answer sheet */}
      <Sheet
        visible={!!answerTarget}
        title="Write an answer"
        onClose={() => setAnswerTarget(null)}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {answerTarget && (
            <View
              className="rounded-2xl p-3"
              style={{ backgroundColor: "#F8FAFC" }}
            >
              <Text
                className="text-[13px] font-semibold"
                style={{ color: COLORS.dark }}
              >
                {answerTarget.question}
              </Text>
            </View>
          )}

          <FieldLabel>Your name (optional)</FieldLabel>
          <TextInput
            value={answerName}
            onChangeText={setAnswerName}
            placeholder="Guest"
            placeholderTextColor={COLORS.placeholder}
            maxLength={60}
            className="h-[50px] rounded-2xl px-4 text-[14px] font-medium bg-white"
            style={{
              borderWidth: 1,
              borderColor: answerName ? COLORS.blue : COLORS.border,
              color: COLORS.dark,
            }}
          />

          <FieldLabel>
            Your answer <Text style={{ color: COLORS.orange }}>*</Text>
          </FieldLabel>
          <TextInput
            value={answerText}
            onChangeText={setAnswerText}
            placeholder="Share what you know..."
            placeholderTextColor={COLORS.placeholder}
            multiline
            maxLength={3000}
            textAlignVertical="top"
            className="rounded-2xl px-4 py-3 text-[14px] font-medium bg-white"
            style={{
              minHeight: 130,
              borderWidth: 1,
              borderColor: answerText ? COLORS.blue : COLORS.border,
              color: COLORS.dark,
            }}
          />

          <InlineError message={answerError} />

          <PrimaryButton
            label="Post answer"
            onPress={submitAnswer}
            busy={answerBusy}
          />
        </ScrollView>
      </Sheet>
    </View>
  );
};

export default CommunityScreen;