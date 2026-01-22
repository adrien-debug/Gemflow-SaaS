import { useState } from "react";
import { Card, Input, Button, List, Typography, Tag, Spin, Space } from "antd";
import { SendOutlined, RobotOutlined } from "@ant-design/icons";
import { useAiAgentQuery } from "@entities/ai-agent/hooks/useAiAgentQuery";
import type { AiAgentResponse } from "@entities/ai-agent/models/ai-agent.model";
import "./styles.scss";

const { TextArea } = Input;
const { Text, Paragraph } = Typography;

interface ChatMessage {
  id: string;
  type: "user" | "agent";
  content: string;
  response?: AiAgentResponse;
  timestamp: Date;
}

export const AiChat = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const aiQuery = useAiAgentQuery();

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: "user",
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");

    try {
      const response = await aiQuery.mutateAsync({ query: inputValue });
      
      const agentMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: "agent",
        content: response.response,
        response,
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, agentMessage]);
    } catch (error) {
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        type: "agent",
        content: "Désolé, une erreur s'est produite. Veuillez réessayer.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
  };

  return (
    <div className="ai-chat" style={{ height: "100%" }}>
      <div style={{ display: "flex", flexDirection: "column", height: "600px" }}>
        <div style={{ flex: 1, overflowY: "auto", marginBottom: 16 }}>
          {messages.length === 0 ? (
            <div className="ai-chat-empty">
              <RobotOutlined style={{ fontSize: 48, marginBottom: 16 }} />
              <Paragraph>
                Bonjour ! Je suis votre assistant IA pour la plateforme Gemsflow.
                <br />
                Je peux vous aider avec :
              </Paragraph>
              <List
                size="small"
                dataSource={[
                  "Statistiques des commandes",
                  "Prix actuels des métaux",
                  "Informations sur les clients",
                  "Import de commandes externes",
                ]}
                renderItem={(item) => <List.Item>• {item}</List.Item>}
              />
            </div>
          ) : (
            <List
              dataSource={messages}
              renderItem={(message) => (
                <List.Item
                  style={{
                    justifyContent: message.type === "user" ? "flex-end" : "flex-start",
                    border: "none",
                  }}
                >
                  <div className={message.type === "user" ? "user-message" : "agent-message"}>
                    {message.type === "agent" && message.response?.type && (
                      <Tag
                        color={
                          message.response.type === "alert"
                            ? "red"
                            : message.response.type === "data"
                              ? "blue"
                              : "green"
                        }
                        style={{ marginBottom: 8 }}
                      >
                        {message.response.type}
                      </Tag>
                    )}
                    <Paragraph style={{ whiteSpace: "pre-wrap" }}>
                      {message.content}
                    </Paragraph>
                    {message.response?.suggestions && message.response.suggestions.length > 0 && (
                      <div className="message-suggestions">
                        <Text type="secondary" style={{ fontSize: 12 }}>
                          Suggestions :
                        </Text>
                        <Space wrap style={{ marginTop: 4 }}>
                          {message.response.suggestions.map((suggestion, idx) => (
                            <Button
                              key={idx}
                              size="small"
                              onClick={() => handleSuggestionClick(suggestion)}
                            >
                              {suggestion}
                            </Button>
                          ))}
                        </Space>
                      </div>
                    )}
                  </div>
                </List.Item>
              )}
            />
          )}
          {aiQuery.isPending && (
            <div style={{ textAlign: "center", padding: 16 }}>
              <Spin tip="L'assistant réfléchit..." />
            </div>
          )}
        </div>
        <Space.Compact className="ai-chat-input" style={{ width: "100%" }}>
          <TextArea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onPressEnter={(e) => {
              if (!e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="Posez votre question..."
            autoSize={{ minRows: 1, maxRows: 4 }}
            disabled={aiQuery.isPending}
          />
          <Button
            type="primary"
            icon={<SendOutlined />}
            onClick={handleSend}
            loading={aiQuery.isPending}
            disabled={!inputValue.trim()}
          >
            Envoyer
          </Button>
        </Space.Compact>
      </div>
    </div>
  );
};
